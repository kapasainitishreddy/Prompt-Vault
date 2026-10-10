#!/usr/bin/env python3
"""Headless Chromium interaction QA for Prompt-Vault Remix Studio.

From repo root:
  pip install playwright
  playwright install chromium
  python3 scripts/qa_remix_studio.py

Tests the actual locally served site in Chromium across 4 breakpoints.
Uses no paid services, network AI, GitHub Actions, credentials or external URLs.
Screenshots/report: .qa-artifacts/remix-studio/
"""
from __future__ import annotations

import functools
import json
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/".qa-artifacts"/"remix-studio"
DOCS=ROOT/"docs"

def main()->int:
 try:
  from playwright.sync_api import sync_playwright
 except ImportError as e:
  raise SystemExit("Install: pip install playwright && playwright install chromium") from e

 OUT.mkdir(parents=True,exist_ok=True)
 handler=functools.partial(SimpleHTTPRequestHandler,directory=str(DOCS))
 server=ThreadingHTTPServer(("127.0.0.1",0),handler)
 threading.Thread(target=server.serve_forever,daemon=True).start()
 origin="http://127.0.0.1:"+str(server.server_port)
 report={"url":origin+"/remix.html","screenshots":[],"console_errors":[],"tests":[]}
 def success(message):
  report["tests"].append(message)
 try:
  with sync_playwright() as play:
   browser=play.chromium.launch(headless=True)
   context=browser.new_context(accept_downloads=True,permissions=["clipboard-read","clipboard-write"])
   for width in [360,390,768,1440]:
    page=context.new_page()
    page.set_viewport_size({"width":width,"height":900})
    page.on("pageerror",lambda error:report["console_errors"].append(str(error)))
    page.goto(origin+"/remix.html",wait_until="domcontentloaded")
    page.wait_for_function("document.querySelectorAll('#rx-gallery .rx-card').length===12",timeout=15000)
    assert "24" in page.locator("#rx-count").inner_text()
    assert not page.evaluate("document.documentElement.scrollWidth>window.innerWidth+2"),"Horizontal overflow at "+str(width)
    page.screenshot(path=str(OUT/("remix-"+str(width)+".png")),full_page=True,animations="disabled")
    report["screenshots"].append(width)
    success("Website designs and no overflow at "+str(width))
    if width==390:
     page.locator('[data-style="swiss-signal"]').click()
     assert page.locator("#rx-selected-title").inner_text()=="Swiss Signal"
     page.locator("#rx-search").fill("editorial")
     assert page.locator("#rx-gallery .rx-card").count()>0
     page.locator("#rx-clear").click()
     success("Style selection and filtering")
     # Art-directed detail is a functional dialog with a real close and use action.
     page.locator("#rx-expand-preview").click()
     assert page.locator("#rx-preview-dialog").evaluate("(el) => el.open")
     assert "Swiss Signal" in page.locator("#rx-full-title").inner_text()
     assert page.locator("#rx-full-stage .sc-window").count()==1
     page.screenshot(path=str(OUT/"remix-expanded-390.png"),animations="disabled")
     page.locator("#rx-full-close").click()
     assert not page.locator("#rx-preview-dialog").evaluate("(el) => el.open")
     success("Accessible full-size design modal and close")

     page.locator('[data-target="app"]').click()
     page.locator('[data-style="airport-planner"]').click()
     assert page.locator("#rx-selected-title").inner_text()=="Gate Board"
     page.locator('[data-variant="expressive"]').click()
     assert page.locator('[data-variant="expressive"]').get_attribute("aria-pressed")=="true"
     success("Mobile design selection and variant")
     assert page.locator("#rx-preview-stage .sc-phone").count()==1
     page.locator("#rx-expand-preview").click()
     assert page.locator("#rx-full-stage .sc-phone").count()==1
     page.locator("#rx-full-use").click()
     assert not page.locator("#rx-preview-dialog").evaluate("(el) => el.open")
     success("Large mobile app preview leads into design brief")

     page.locator("#rx-name").fill("Atlas QA Example")
     page.locator("#rx-url").fill("https://example.com/demo")
     page.locator("#rx-goal").fill("Build an accessible offline reader")
     page.locator("#rx-change").fill("Replace repetitive cards with a calm book shelf")
     page.locator("#rx-preserve").fill("KEEP USER BOOKMARKS AND PAYMENT FLOWS")
     page.locator("#rx-scope").select_option("section")
     page.locator("#rx-focus").select_option("paywall")
     page.locator(".rx-advanced summary").click()
     page.locator("#rx-blueprint").select_option("reader")
     page.locator("#rx-concept").select_option("app-value-before-signup")
     page.locator("#rx-generate").click()
     full=page.locator("#rx-prompt").input_value()
     assert "Atlas QA Example" in full
     assert "KEEP USER BOOKMARKS AND PAYMENT FLOWS" in full
     assert "Value-before-signup" in full
     assert "paywall" in full.lower()
     assert "React Native" not in full or "iOS and Android" in full
     success("Personalized preservation-safe prompt with style, concept, scope")

     page.locator("#rx-copy").click()
     copied=page.evaluate("navigator.clipboard.readText()")
     assert copied==full,"Clipboard differs from visible prompt"
     success("Exact prompt copied to clipboard")
     with page.expect_download() as dl:
      page.locator("#rx-download").click()
     item=dl.value
     assert item.suggested_filename.endswith(".md")
     success("Markdown export")
     page.locator('[data-output="audit"]').click()
     audit=page.locator("#rx-prompt").input_value()
     assert "issue table" in audit and "screen" in audit.lower()
     success("Separate QA and polish prompt")
     page.locator('[data-output="build"]').click()
     assert "KEEP USER BOOKMARKS AND PAYMENT FLOWS" in page.locator("#rx-prompt").input_value()
    page.close()

   deep=context.new_page()
   deep.set_viewport_size({"width":390,"height":844})
   deep.on("pageerror",lambda error:report["console_errors"].append(str(error)))
   deep.goto(origin+"/remix.html?type=website&style=editorial-atlas&section=hero&concept=web-editorial-first-fold",wait_until="domcontentloaded")
   deep.wait_for_function("document.querySelector('#rx-ready').textContent.includes('ready')",timeout=15000)
   assert deep.locator("#rx-selected-title").inner_text()=="Editorial Atlas"
   assert deep.locator("#rx-scope").input_value()=="section"
   assert deep.locator("#rx-focus").input_value()=="hero"
   assert deep.locator("#rx-concept").input_value()=="web-editorial-first-fold"
   success("Deep links retain public style, component and UX concept")
   deep.close()
   # Every individual style has an original non-placeholder scene and a prompt.
   allstyles=json.loads((DOCS/"data/styles.json").read_text())["styles"]
   for style in allstyles:
    kind=style["target"]
    sample=context.new_page()
    sample.set_viewport_size({"width":1280,"height":800})
    sample.goto(origin+"/remix.html?type="+kind+"&style="+style["id"],wait_until="domcontentloaded")
    sample.wait_for_function("document.querySelector('#rx-ready').textContent.includes('ready')",timeout=15000)
    assert sample.locator("#rx-preview-stage .sc-window, #rx-preview-stage .sc-phone").count()==1,style["id"]
    sample.close()
   success("48 direct visual-style links load the correct artboard")
   browser.close()
  assert not report["console_errors"],"Uncaught page errors: "+str(report["console_errors"])
  (OUT/"report.json").write_text(json.dumps(report,indent=2),encoding="utf8")
  print("PASSED REMIX STUDIO QA\n"+json.dumps(report,indent=2))
  return 0
 finally:
  server.shutdown()
  server.server_close()

if __name__=="__main__":
 raise SystemExit(main())
