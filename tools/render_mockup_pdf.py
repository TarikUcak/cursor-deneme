import os
import sys


def render_with_pymupdf(pdf_path: str, out_dir: str) -> int:
    import fitz  # type: ignore

    doc = fitz.open(pdf_path)
    for i in range(doc.page_count):
        page = doc.load_page(i)
        pix = page.get_pixmap(dpi=200)
        out_path = os.path.join(out_dir, f"page_{i+1}.png")
        pix.save(out_path)
    return doc.page_count


def render_with_pdf2image(pdf_path: str, out_dir: str) -> int:
    from pdf2image import convert_from_path  # type: ignore

    images = convert_from_path(pdf_path, dpi=200)
    for i, img in enumerate(images):
        out_path = os.path.join(out_dir, f"page_{i+1}.png")
        img.save(out_path)
    return len(images)


def main() -> None:
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else r"c:\Users\Tarik\Desktop\MTA WEB MOCKUP.pdf"
    out_dir = sys.argv[2] if len(sys.argv) > 2 else r"c:\Users\Tarik\Desktop\Cursor_deneme\_mockup_pages"

    os.makedirs(out_dir, exist_ok=True)

    try:
        n = render_with_pymupdf(pdf_path, out_dir)
        print(f"rendered_with_pymupdf {n} pages -> {out_dir}")
        return
    except Exception as e:
        print(f"pymupdf_failed: {type(e).__name__}: {e}")

    try:
        n = render_with_pdf2image(pdf_path, out_dir)
        print(f"rendered_with_pdf2image {n} pages -> {out_dir}")
        return
    except Exception as e:
        print(f"pdf2image_failed: {type(e).__name__}: {e}")

    print("no_renderer_available")
    raise SystemExit(2)


if __name__ == "__main__":
    main()

