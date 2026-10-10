"""Source and executable JavaScript regression gates for the premium remix overhaul.

No CI minutes or paid services required. Run from repository root:
    python3 -m unittest tests.test_remix_art_direction -v

A real Chromium smoke suite exists at scripts/qa_remix_studio.py and must be
executed before declaring production interaction accessibility.
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

class IDReader(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=[]
 def handle_starttag(self,tag,attrs):
  ids=dict(attrs)
  if ids.get("id"):self.ids.append(ids["id"])

class ArtDirectionTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.styles=json.loads((DOCS/"data/styles.json").read_text(encoding="utf8"))["styles"]
  cls.scenes=(DOCS/"remix-scenes.mjs").read_text(encoding="utf8")
  cls.scene_css=(DOCS/"remix-scenes.css").read_text(encoding="utf8")
  cls.premium=(DOCS/"remix-premium.css").read_text(encoding="utf8")
  cls.core=(DOCS/"remix-core.mjs").read_text(encoding="utf8")
  cls.ui=(DOCS/"remix.js").read_text(encoding="utf8")
  cls.page=(DOCS/"remix.html").read_text(encoding="utf8")

 def test_all_48_designs_have_separate_original_artboards(self):
  self.assertEqual(len(self.styles),48)
  web=self.scenes.split("const web={",1)[1].split("};\nconst app=",1)[0]
  app=self.scenes.split("const app={",1)[1].split("};\nexport const sceneIds=",1)[0]
  names=lambda s:re.findall(r'^"([a-z0-9-]+)":\(\)=>',s,re.M)
  a,b=names(web),names(app)
  self.assertEqual(len(a),24)
  self.assertEqual(len(b),24)
  self.assertEqual(len(set(a+b)),48)
  self.assertEqual(set(a),{s["id"] for s in self.styles if s["target"]=="website"})
  self.assertEqual(set(b),{s["id"] for s in self.styles if s["target"]=="app"})
  self.assertIn("sceneFor",self.scenes)
  self.assertIn("sceneIds",self.scenes)

 def test_detailed_build_brief_has_per_style_composition_contract(self):
  for item in self.styles:
   with self.subTest(style=item["id"]):
    self.assertIn('"'+item["id"]+'":',self.core)
  self.assertIn("Non-negotiable visual composition",self.core)
  self.assertIn("Do not replace it with generic rounded feature cards",self.core)
  self.assertIn("preserve existing behavior",self.core.lower())

 def test_full_preview_and_curation_links_are_real(self):
  parsed=IDReader();parsed.feed(self.page)
  self.assertEqual(len(parsed.ids),len(set(parsed.ids)))
  for id in ["rx-expand-preview","rx-preview-dialog","rx-full-stage","rx-full-title",
             "rx-full-close","rx-full-use","rx-curations","rx-gallery","rx-prompt"]:
   self.assertIn(id,parsed.ids)
  self.assertIn("showModal()",self.ui)
  self.assertIn("closeFullPreview",self.ui)
  self.assertIn("renderHeroArt",self.ui)
  self.assertIn("renderCurations",self.ui)
  for id in ["rx-premium","remix-scenes.css","remix-premium.css"]:
   self.assertIn(id if not id.startswith("rx-premium") else "remix-premium.css",self.page)

 def test_homepage_has_visible_static_fallbacks(self):
  home=(DOCS/"index.html").read_text(encoding="utf8")
  self.assertIn("pv-curated-grid",home)
  self.assertIn("remix-scenes.css",home)
  self.assertIn("home-curated.css",home)
  self.assertIn("home-curated.mjs",home)
  self.assertIn("EDITORIAL",home.upper())
  self.assertIn("remix.html?type=website",home)
  self.assertIn("remix.html?type=app",home)
  self.assertIn("Explore all 48",home)

 def test_css_has_reduced_motion_and_responsive_detailed_preview(self):
  self.assertIn("prefers-reduced-motion",self.scene_css)
  self.assertIn("prefers-reduced-motion",self.premium)
  self.assertIn(".sc-window-content",self.scene_css)
  self.assertIn(".sc-phone",self.scene_css)
  self.assertIn(".rx-full-dialog",self.premium)
  self.assertIn(".rx-hero-scene-one",self.premium)
  self.assertIn("@media(max-width:620px)",self.premium)
  self.assertIn("Minimum 44px ergonomic targets",self.premium)
  self.assertIn(".rx-curations button,.rx-variant-buttons button",self.premium)

 @unittest.skipUnless(shutil.which("node"),"Node unavailable")
 def test_node_generates_288_studies_and_unique_prompts(self):
  for path in ["remix-scenes.mjs","remix-core.mjs","remix.js","home-curated.mjs"]:
   result=subprocess.run(["node","--check",str(DOCS/path)],capture_output=True,text=True,timeout=12)
   self.assertEqual(result.returncode,0,result.stderr)
  code=r"""
import fs from 'node:fs';
import {sceneFor,sceneIds} from './docs/remix-scenes.mjs';
import {composeBuild,designComposition} from './docs/remix-core.mjs';
const all=JSON.parse(fs.readFileSync('./docs/data/styles.json','utf8')).styles;
let rendered=0;const distinct=new Set();
for(const s of all){
 if(!sceneIds[s.target].includes(s.id)||!designComposition[s.id])throw Error('missing style '+s.id);
 for(const mini of [true,false])for(const variant of ['balanced','expressive','compact']){
   const result=sceneFor(s,{mini,variant,name:'My working product'});
   if(!result.includes('rx-visual')||!result.includes(s.id))throw Error('bad artboard '+s.id);
   distinct.add(result);rendered++;
 }
 for(const mode of ['existing','new']){
   const brief=composeBuild({target:s.target,style:s,project:{mode,scope:'full',name:'My working product',preserve:'Keep original sign-in'}});
   if(!brief.includes(designComposition[s.id])||!brief.includes('Keep original sign-in'))throw Error('bad prompt '+s.id);
 }
}
if(rendered!==288||distinct.size!==288)throw Error('incomplete artboards '+rendered);
console.log('RENDERED '+rendered+' UNIQUE '+distinct.size+' COMPOSITION PROMPTS '+Object.keys(designComposition).length);
"""
  run=subprocess.run(["node","--input-type=module","-e",code],cwd=ROOT,capture_output=True,text=True,timeout=25)
  self.assertEqual(run.returncode,0,run.stderr)
  self.assertIn("RENDERED 288 UNIQUE 288 COMPOSITION PROMPTS 48",run.stdout)

if __name__=="__main__":
 unittest.main()
