"""Static checks for the complete site, catalogs and original prompt previews.

No browser, paid hosting, third-party API or GitHub Actions are needed.
Functional accessibility and real-device testing remain separate obligations.
"""
import json
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/'docs'
TRACKS={
    'website': ('sections','website','website','sections'),
    'app': ('flows','app','app','flows'),
    'motion': ('recipes','motion','motion',''),
}

class Markup(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=[]
        self.controls=[]
        self.local=[]
    def handle_starttag(self,tag,attrs):
        data=dict(attrs)
        if data.get('id'):self.ids.append(data['id'])
        if data.get('aria-controls'):self.controls.extend(data['aria-controls'].split())
        for name in ('href','src'):
            target=data.get(name)
            if not target or target.startswith(('#','http:','https:','mailto:','data:')):continue
            self.local.append(target)

class AtlasTests(unittest.TestCase):
    def test_five_distinct_pages_and_internal_navigation(self):
        pages=('index','websites','apps','motion','principles')
        for name in pages:
            path=DOCS/f'{name}.html'
            self.assertTrue(path.is_file(),str(path))
            html=path.read_text(encoding='utf8')
            self.assertIn(f'data-page="{name if name!="index" else "home"}"',html)
            doc=Markup()
            doc.feed(html)
            self.assertEqual(len(doc.ids),len(set(doc.ids)),f'duplicate ID: {name}')
            for controlled in doc.controls:self.assertIn(controlled,doc.ids,(name,controlled))
            for dest in doc.local:
                resolved=(path.parent/unquote(dest.split('#')[0].split('?')[0])).resolve()
                self.assertTrue(resolved.is_file(),f'{name} points to absent {dest}')
            self.assertIn('id="detail-dialog"',html)

    def test_every_catalog_item_has_exact_copyable_original_prompt(self):
        expected={'website':32,'app':32,'motion':23}
        for track,(key,source,docpath,sub) in TRACKS.items():
            file=ROOT/'catalog'/({'website':'website-sections','app':'app-flows','motion':'motion-recipes'}[track]+'.json')
            data=json.loads(file.read_text(encoding='utf8'))
            copies=DOCS/'data'/f'{docpath}.json'
            self.assertEqual(file.read_bytes(),copies.read_bytes())
            entries=data[key]
            self.assertEqual(len(entries),expected[track])
            self.assertEqual(len({entry['id'] for entry in entries}),expected[track])
            for entry in entries:
                path=(ROOT/'prompts'/source/(sub or '')/(entry['id']+'.md'))
                target=(DOCS/'prompts'/source/(sub or '')/(entry['id']+'.md'))
                self.assertEqual(path.read_bytes(),target.read_bytes(),str(target))

    def test_site_needs_no_external_ui_dependencies(self):
        script=(DOCS/'atlas.js').read_text(encoding='utf8')
        css=(DOCS/'styles.css').read_text(encoding='utf8')
        self.assertIn('prefers-reduced-motion',css)
        self.assertIn('detail-dialog',script)
        self.assertIn('copyPrompt()',script)
        self.assertIn('chooseVariant(number)',script)
        self.assertNotIn('https://cdn.',css)
        self.assertNotIn('https://cdn.',script)
        self.assertFalse((DOCS/'package.json').exists())

if __name__=='__main__':
    unittest.main()
