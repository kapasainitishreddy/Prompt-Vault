"""Contract checks for Remix Studio's visual selection and prompt handoff.

These tests verify catalog wiring and generated copy. A real browser test is
available separately in scripts/qa_remix_studio.py; source checks are not
an accessibility certification or proof of a deployed working product.
"""
from __future__ import annotations
import json
import re
import shutil
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/"docs"

class IDParser(HTMLParser):
 def __init__(self):
  super().__init__()
  self.ids=[]
 def handle_starttag(self,tag,attrs):
  attrs=dict(attrs)
  if "id" in attrs:self.ids.append(attrs["id"])

class RemixStudioTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.html=(DOCS/"remix.html").read_text(encoding="utf8")
  cls.core=(DOCS/"remix-core.mjs").read_text(encoding="utf8")
  cls.ui=(DOCS/"remix.js").read_text(encoding="utf8")
  cls.css=(DOCS/"remix.css").read_text(encoding="utf8")
  cls.styles=json.loads((DOCS/"data/styles.json").read_text())["styles"]
  cls.web=json.loads((DOCS/"data/website.json").read_text())["sections"]
  cls.apps=json.loads((DOCS/"data/app.json").read_text())["flows"]
  cls.web_guides=json.loads((DOCS/"data/guided-websites.json").read_text())["blueprints"]
  cls.app_guides=json.loads((DOCS/"data/guided-apps.json").read_text())["blueprints"]
  cls.web_concepts=json.loads((DOCS/"data/concepts-web.json").read_text())["concepts"]
  cls.app_concepts=json.loads((DOCS/"data/concepts-app.json").read_text())["concepts"]

 def test_complete_original_design_and_ux_catalogs(self):
  self.assertEqual(len(self.styles),48)
  self.assertEqual(len([x for x in self.styles if x["target"]=="website"]),24)
  self.assertEqual(len([x for x in self.styles if x["target"]=="app"]),24)
  self.assertEqual(len(self.web),32)
  self.assertEqual(len(self.apps),32)
  self.assertEqual(len(self.web_guides),20)
  self.assertEqual(len(self.app_guides),20)
  self.assertEqual(len(self.web_concepts),100)
  self.assertEqual(len(self.app_concepts),100)
  self.assertEqual(len({x["id"] for x in self.styles}),48)

 def test_dom_selectors_unique_and_present(self):
  parser=IDParser()
  parser.feed(self.html)
  self.assertEqual(len(parser.ids),len(set(parser.ids)))
  refs=set(re.findall(r'\$\("([a-z][a-z0-9-]+)"\)',self.ui))
  self.assertFalse(refs-set(parser.ids),refs-set(parser.ids))
  self.assertIn('id="rx-copy"',self.html)
  self.assertIn('id="rx-prompt"',self.html)
  self.assertIn('id="rx-concept"',self.html)
  self.assertIn('id="rx-blueprint"',self.html)

 def test_visuals_are_local_and_have_accessibility_fallbacks(self):
  self.assertIn('aria-pressed="true"',self.html)
  self.assertIn('role="status"',self.html)
  self.assertIn('class="rx-skip"',self.html)
  self.assertIn('<noscript>',self.html)
  self.assertIn('prefers-reduced-motion',self.css)
  self.assertIn('@media(max-width:390px)',self.css)
  self.assertIn('rx-device',self.css)
  self.assertIn('rx-v-console',self.css)

 def test_redesign_prompt_preserves_real_features(self):
  self.assertIn("Preserve functionality and data contracts",self.core)
  self.assertIn("not permission to rebuild from scratch",self.core)
  self.assertIn("Never introduce unapproved paid dependencies",self.core)
  self.assertIn("Scope:",self.core)
  self.assertIn("Success question to verify:",self.core)
  self.assertIn("## Definition of done",self.core)
  self.assertIn("selected",self.core.lower())

 def test_deeplinks_and_all_entrypoints(self):
  self.assertIn("styleParam",self.ui)
  self.assertIn("conceptParam",self.ui)
  self.assertIn("sectionParam",self.ui)
  self.assertIn("style-remix", (DOCS/"styles.html").read_text())
  self.assertIn("style-remix", (DOCS/"style-lab.js").read_text())
  self.assertIn("detail-remix-link", (DOCS/"atlas.js").read_text())
  self.assertIn("detail-remix-link", (DOCS/"apps.html").read_text())
  self.assertIn("detail-remix-link", (DOCS/"websites.html").read_text())
  self.assertIn("remix-concept-link", (DOCS/"concepts.js").read_text())
  self.assertIn("remix.html", (DOCS/"sitemap.xml").read_text())
  for path in ["index.html","start-here.html","mobile-studio.html","styles.html"]:
   self.assertIn("remix.html",(DOCS/path).read_text(),path)

 def test_no_website_crawling_or_model_connection(self):
  self.assertIn("NEVER crawls",self.ui)
  self.assertNotIn("https://api.openai.com",self.ui)
  self.assertNotIn("new WebSocket",self.ui)
  self.assertNotIn("fetch(project",self.ui)
  self.assertIn("async function copyOutput",self.ui)
  self.assertIn('id="rx-copy"',self.html)

 @unittest.skipUnless(shutil.which("node"),"Node is not installed")
 def test_node_syntax_and_prompt_variations(self):
  for file in ["remix.js","remix-core.mjs"]:
   result=subprocess.run(["node","--check",str(DOCS/file)],capture_output=True,text=True,timeout=12)
   self.assertEqual(result.returncode,0,result.stderr)
  script=r"""
import fs from 'node:fs';
import {composeBuild,composeAudit} from './docs/remix-core.mjs';
const styles=JSON.parse(fs.readFileSync('./docs/data/styles.json')).styles;
const web=JSON.parse(fs.readFileSync('./docs/data/concepts-web.json')).concepts;
const apps=JSON.parse(fs.readFileSync('./docs/data/concepts-app.json')).concepts;
let count=0;
for(const style of styles){
 for(const mode of ['new','existing']){
  const concept=(style.target==='app'?apps:web)[0];
  const project={mode,scope:'full',name:'Verified Example',change:'Improve hierarchy',preserve:'Keep working auth and checkout',variant:'expressive'};
  const args={target:style.target,style,project,concept};
  const build=composeBuild(args),audit=composeAudit(args);
  if(!build.includes('Verified Example')||!build.includes('Keep working auth and checkout')||!build.includes(concept.title)||!audit.includes('issue table'))process.exit(2);
  count++;
 }
}
console.log('Verified '+count+' prompts');
"""
  result=subprocess.run(["node","--input-type=module","-e",script],cwd=ROOT,capture_output=True,text=True,timeout=20)
  self.assertEqual(result.returncode,0,result.stderr)
  self.assertIn("Verified 96 prompts",result.stdout)

if __name__=="__main__":
 unittest.main()
