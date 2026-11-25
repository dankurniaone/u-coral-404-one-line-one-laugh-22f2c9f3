"""One Line, One Laugh — u-coral-404-one-line-one-laugh-22f2c9f3.

Writes a single sharp one-liner to /output/entry.txt and self-checks
the gate: UTF-8 text, 1 to 200 characters, not only whitespace.
Stdlib only.
"""

import os

LINE = (
    "My printer only jams when the document matters. "
    "It smells deadlines the way sharks smell blood, "
    "except sharks don't charge per page."
)


def main():
    text = LINE.strip()
    assert text, "line must not be empty"
    assert text == text.strip(), "no leading/trailing whitespace"
    assert 1 <= len(text) <= 200, f"gate: {len(text)} chars, need 1-200"
    assert not text.isspace(), "gate: whitespace only"
    text.encode("utf-8")
    out_dir = "/output"
    try:
        os.makedirs(out_dir, exist_ok=True)
    except OSError:
        out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
        os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "entry.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"wrote {path}: {len(text)} chars")


if __name__ == "__main__":
    main()
