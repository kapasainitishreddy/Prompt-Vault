"""Signature gallery and same-origin code-copy invariants.

These checks are intentionally honest: they verify the source contract, not a
native app build, a rendered browser session or a WCAG certification.
"""
import json
import re
import shutil
import subprocess
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/"docs"
NATIVE=ROOT/"native-kit"

class SignatureGalleryTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.script=(DOCS/"signature-collection.js").read_text(encoding="utf8")
  cls.css=(DOCS/"signature-collection.css").read_text(encoding="utf8")
  cls.html=(DOCS/"mobile-studio.html").read_text(encoding="utf8")
  cls.mobile=(DOCS/"mobile-studio.js").read_text(encoding="utf8")
  cls.expo=(NATIVE/"src/SignatureScreen.tsx").read_text(encoding="utf8")
  cls.app=(NATIVE/"App.tsx").read_text(encoding="utf8")
  cls.designs=json.loads(cls.script.split("const designs = ",1)[1].split(";\nconst escape",1)[0])
  cls.manifest=json.loads((NATIVE/"signatures.json").read_text(encoding="utf8"))
  cls.flows=json.loads((DOCS/"data/app.json").read_text(encoding="utf8"))["flows"]
  cls.journeys=json.loads((DOCS/"data/guided-apps.json").read_text(encoding="utf8"))["blueprints"]

 def test_exactly_sixteen_distinct_layouts_and_source_pairs(self):
  self.assertEqual(len(self.designs),16)
  ids=[d["id"] for d in self.designs]
  self.assertEqual(len(set(ids)),16)
  self.assertEqual(ids,[d["id"] for d in self.manifest])
  self.assertEqual(set(ids),set(re.findall(r'case "([^"]+)":',self.expo)))
  for design in self.designs:
   with self.subTest(name=design["id"]):
    self.assertIn(".sg-"+design["id"],self.css)
    self.assertIn("sg-",design["scene"])
    self.assertGreater(len(design["scene"]),80)
    self.assertGreater(len(design["why"]),35)

 def test_all_signature_journeys_and_flows_exist(self):
  valid_journeys={x["id"] for x in self.journeys}
  valid_flows={x["id"] for x in self.flows}
  for design in self.designs:
   with self.subTest(design=design["id"]):
    self.assertIn(design["journey"],valid_journeys)
    self.assertIn(design["flow"],valid_flows)
    self.assertTrue(any(x["id"]==design["journey"] and design["flow"] in x["flows"] for x in self.journeys))

 def test_website_gallery_and_native_tab_connected(self):
  self.assertIn('id="ms-signature-grid"',self.html)
  self.assertIn('id="ms-copy-signatures"',self.html)
  self.assertIn("./signature-collection.js",self.html)
  self.assertIn("./signature-collection.css",self.html)
  self.assertIn('window.addEventListener("pv:open-signature"',self.mobile)
  self.assertIn('tab==="showcase"',self.app)
  self.assertIn("<SignatureScreen",self.app)

 def test_copyable_sources_never_drift(self):
  for name in ["SignatureScreen.tsx","FlowScreen.tsx","components.tsx","tokens.ts"]:
   with self.subTest(name=name):
    web_copy=(DOCS/"code"/name).read_bytes()
    native=(NATIVE/"src"/name).read_bytes()
    self.assertEqual(web_copy,native)
  self.assertIn('id="ms-copy-native"',self.html)
  self.assertIn("function copyNativeAsset",self.mobile)
  self.assertIn("./code/FlowScreen.tsx",self.mobile)
  self.assertIn("./code/SignatureScreen.tsx",self.mobile)

 def test_accessibility_and_no_misleading_native_claims(self):
  self.assertIn("data-signature",self.script)
  self.assertIn("aria-label=",self.script)
  self.assertIn("prefers-reduced-motion",self.css)
  self.assertIn("illustrative",self.html.lower())
  self.assertIn("not screenshots",self.html.lower())
  self.assertIn("accessibilityRole",self.expo)
  self.assertIn("sample",self.expo.lower())

 @unittest.skipUnless(shutil.which("node"),"Node not installed")
 def test_js_parses_in_node(self):
  for name in ["signature-collection.js","mobile-studio.js"]:
   with self.subTest(name=name):
    result=subprocess.run(["node","--check",str(DOCS/name)],capture_output=True,text=True,timeout=15)
    self.assertEqual(result.returncode,0,result.stderr)

if __name__=="__main__":
 unittest.main()
