"""Run with python -m unittest discover -s tests. No external services."""
import json, subprocess, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class LearningContent(unittest.TestCase):
 def test_required_surfaces_exist(self):
  for file in ('studio.html','studio.css','studio.mjs','studio-data.mjs','support.html','support.mjs','support-config.json'):
   self.assertTrue((ROOT/'docs'/file).is_file(),file)
 def test_hundred_original_lessons_with_explicit_sources(self):
  if not (ROOT/'docs/studio-data.mjs').exists(): self.fail('Studio lesson data has not been built')
  script="import {lessons,families,sources,promptFor} from './docs/studio-data.mjs';console.log(JSON.stringify({lessons,families,sources,prompts:lessons.map(l=>promptFor(l,'A sample project','Build'))}));"
  result=subprocess.run(['node','--input-type=module','-e',script],cwd=ROOT,capture_output=True,text=True)
  self.assertEqual(result.returncode,0,result.stderr)
  d=json.loads(result.stdout); rows=d['lessons']
  self.assertEqual(len(rows),100);self.assertEqual(sum(l['track']=='app' for l in rows),60)
  self.assertEqual(len({l['id'] for l in rows}),100)
  for lesson,prompt in zip(rows,d['prompts']):
   for key in ('title','meaning','placement','example','avoid','check'):
    self.assertGreater(len(lesson[key]),10,(lesson['id'],key))
   fam=d['families'][lesson['family']]
   for s in fam['sources']: self.assertIn(s,d['sources'])
   self.assertIn(lesson['meaning'],prompt);self.assertIn(lesson['check'],prompt)
   self.assertIn('UNVERIFIED',prompt);self.assertIn('four',prompt.lower())
 def test_support_default_has_no_invented_payment_or_sponsors(self):
  p=ROOT/'docs/support-config.json'
  self.assertTrue(p.exists(),'Support configuration missing')
  d=json.loads(p.read_text());self.assertIsNone(d['coffeeUrl']);self.assertEqual(d['sponsors'],[]);self.assertIsNone(d['video'])
 def test_no_client_secrets_or_paid_apis(self):
  for path in (ROOT/'docs').glob('*.mjs'):
   text=path.read_text()
   for bad in ('sk-proj-', 'eval(', 'new Function(', 'api.openai.com'):
    self.assertNotIn(bad,text,str(path))
if __name__=='__main__':unittest.main()
