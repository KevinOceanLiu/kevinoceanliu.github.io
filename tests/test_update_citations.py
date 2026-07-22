import importlib.util
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "update_citations.py"
SPEC = importlib.util.spec_from_file_location("update_citations", SCRIPT_PATH)
update_citations = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(update_citations)


class ParseCitationsTests(unittest.TestCase):
    def test_reads_the_total_citations_row(self):
        html = '''
            <a href="/citations?view_op=list_hcore&user=Pup0q0gAAAAJ">Citations</a></td>
            <td class="gsc_rsb_std">1,234</td>
            <tr><td>h-index</td><td class="gsc_rsb_std">12</td></tr>
        '''

        self.assertEqual(update_citations.parse_citations(html), 1234)

    def test_rejects_a_bot_protection_page(self):
        html = "Our systems have detected unusual traffic from your computer network."

        with self.assertRaises(update_citations.CitationFetchError):
            update_citations.parse_citations(html)

    def test_rejects_an_unrelated_profile(self):
        html = '<a href="/citations?user=another-profile">Citations</a>'

        with self.assertRaises(update_citations.CitationFetchError):
            update_citations.parse_citations(html)


if __name__ == "__main__":
    unittest.main()
