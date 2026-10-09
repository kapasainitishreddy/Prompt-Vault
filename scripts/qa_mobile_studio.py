#!/usr/bin/env python3
"""Real Chromium smoke test for Prompt-Vault's local Mobile Studio.

Run after: pip install playwright && playwright install chromium
    python3 scripts/qa_mobile_studio.py

Requires a local browser (not GitHub Actions or any paid service). Produces
screenshots in .qa-artifacts/mobile-studio/; never claims to test real Android
or iOS, MCP transport, AI, payments or authentication.
"""
from __future__ import annotations

import functools
import json
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/".qa-artifacts"/"mobile-studio"
DOCS=ROOT/"docs"

def main() -> int:
 try:
  from playwright.sync_api import sync_playwright
 except ImportError as exc:
  print("Playwright is not installed. Run: pip install playwright && playwright install chromium")
  raise SystemExit(2) from exc

 OUT.mkdir(parents=True,exist_ok=True)
 handler=functools.partial(SimpleHTTPRequestHandler,directory=str(DOCS))
 server=ThreadingHTTPServer(("127.0.0.1",0),handler)
 threading.Thread(target=server.serve_forever,daemon=True).start()
 origin="http://127.0.0.1:"+str(server.server_port)
 report={"origin":origin,"responsive":[],"flow_checks":0,"signature_checks":0,"source_copy":{},"page_errors":[]}
 try:
  with sync_playwright() as pw:
   browser=pw.chromium.launch(headless=True)
   for width in [360,390,768,1440]:
    page=browser.new_page(viewport={"width":width,"height":900},device_scale_factor=1)
    page.on("pageerror",lambda error:report["page_errors"].append(str(error)))
    page.goto(origin+"/mobile-studio.html",wait_until="domcontentloaded")
    page.wait_for_function("document.querySelectorAll('#ms-journeys .ms-journey').length===20",timeout=12000)
    assert page.locator("#ms-pattern-grid .ms-pattern-item").count()==32,"Missing patterns"
    assert page.locator("#ms-signature-grid .sg-card").count()==16,"Missing distinct signatures"
    page.screenshot(path=str(OUT/("mobile-"+str(width)+".png")),full_page=True,animations="disabled")
    overflow=page.evaluate("document.documentElement.scrollWidth > innerWidth + 2")
    report["responsive"].append({"width":width,"horizontal_overflow":overflow})
    assert not overflow,"Horizontal overflow at "+str(width)+"px"
    if width==390:
     for mode in ["dark","light"]:
      page.locator("[data-theme='"+mode+"']").first.click()
      assert page.locator("#ms-phone").get_attribute("data-theme")==mode
     for scenario in ["success","error","normal"]:
      page.locator("[data-scenario='"+scenario+"']").click()
      assert page.locator("#ms-phone").get_attribute("data-scenario")==scenario
     for signature_id in ["literary","aviation","learning","finance","social","b2b"]:
      page.locator("[data-signature='"+signature_id+"']").click()
      assert page.locator("#ms-current-flow").text_content().strip(),signature_id
      report["signature_checks"]+=1
     flow_ids=[x["id"] for x in json.loads((DOCS/"data/app.json").read_text())["flows"]]
     for flow in flow_ids:
      page.locator('#ms-pattern-grid button[data-select-flow="'+flow+'"]').click()
      assert page.locator("#ms-current-flow").text_content().strip(),flow
      assert page.locator("#ms-phone-screen").locator(".ms-app-kicker").count()==1,flow
      report["flow_checks"]+=1
     page.locator("#ms-compose-idea").fill("A friendly offline reading app with a quiet, accessible reader")
     page.locator("#ms-compose-journey").select_option("reader")
     page.locator("#ms-compose-generate").click()
     brief=page.locator("#ms-compose-result").input_value()
     assert "offline reading app" in brief and "end-to-end" in brief.lower()
     for rel in ["FlowScreen.tsx","SignatureScreen.tsx","components.tsx","tokens.ts"]:
      status=page.evaluate("""async rel => {
        const res=await fetch('./code/'+rel);const body=await res.text();
        return {status:res.status,length:body.length,isNative:body.includes('react-native')};
      }""",rel)
      report["source_copy"][rel]=status
      assert status["status"]==200 and status["length"]>200 and (status["isNative"] or rel=="tokens.ts"),rel
    page.close()
   browser.close()
  assert not report["page_errors"],"Uncaught JS errors: "+str(report["page_errors"])
  (OUT/"report.json").write_text(json.dumps(report,indent=2))
  print("PASSED",json.dumps(report,indent=2))
  return 0
 finally:
  server.shutdown()
  server.server_close()

if __name__=="__main__":
 raise SystemExit(main())
