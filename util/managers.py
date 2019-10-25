from pathlib import Path

class HtmlManager:
    def __init__(self, root_dir, base_file):
        self.root_dir = Path(root_dir)
        self.base_file = base_file

    def _index_of_string(self, html, string):
        for i in range(len(html)):
            if string in html[i]:
                return i
        return -1

    def _substitute_wildcard(self, wildcard, begin_substitute, end_substitute, wildcard_list, substitute_list):
        wildcard_index = self._index_of_string(wildcard_list, wildcard)
        begin_index = self._index_of_string(substitute_list, begin_substitute)
        end_index = self._index_of_string(substitute_list, end_substitute)

        if (begin_index != -1 and end_index != -1):
            print(wildcard_index, begin_index, end_index)
            wildcard_list = wildcard_list[: wildcard_index] + substitute_list[begin_index + 1 : end_index] + wildcard_list [wildcard_index + 1 :]
        else:
            if (wildcard_index != -1):
                del wildcard_list[wildcard_index]

        return wildcard_list

    def get(self, child_file):
        parsed_html = []

        # Read base file
        base_file = self.root_dir / self.base_file
        with base_file.open() as f:
            for line in f.readlines(): parsed_html.append(line)

        # Read child file
        child_file = self.root_dir / child_file
        child_html = []
        with child_file.open() as f:
            for line in f.readlines(): child_html.append(line)

        # Swap Header Wildcard
        parsed_html = self._substitute_wildcard("{%headers%}", "<head>", "</head>", parsed_html, child_html)
            
        # Swap Body Wildcard
        parsed_html = self._substitute_wildcard("{%body%}", "<body>", "</body>", parsed_html, child_html)

        return "".join(parsed_html)