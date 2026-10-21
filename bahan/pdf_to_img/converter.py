import os
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ModuleNotFoundError:
    raise SystemExit("Library PyMuPDF belum terinstall. Jalankan: pip install PyMuPDF")

def convert_pdf_to_images(pdf_folder: str):
    pdf_dir = Path(pdf_folder)
    
    if not pdf_dir.exists():
        print(f"Folder tidak ditemukan: {pdf_folder}")
        return

    output_dir = pdf_dir / "converted_images"
    output_dir.mkdir(exist_ok=True)

    pdf_files = list(pdf_dir.glob("*.pdf"))

    if not pdf_files:
        print(f"Tidak ada file PDF di folder: {pdf_folder}")
        return

    for pdf_file in pdf_files:
        try:
            doc = fitz.open(str(pdf_file))
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)

                image_name = f"{pdf_file.stem}_page_{page_num + 1}.png"
                image_path = output_dir / image_name

                pix.save(str(image_path))
                print(f"Berhasil: {image_path}")

            doc.close()
        except Exception as e:
            print(f"Gagal convert {pdf_file}: {e}")

    print(f"\nSemua file PDF di {pdf_folder} sudah diproses.")
    print(f"Hasil gambar ada di: {output_dir}")

if __name__ == "__main__":
    while True:
        user_input = input("Masukkan path folder PDF: ").strip()
        pdf_dir = Path(user_input).expanduser().resolve()

        if pdf_dir.exists() and pdf_dir.is_dir():
            convert_pdf_to_images(str(pdf_dir))
            break

        print("Folder tidak ditemukan atau bukan folder. Silakan masukkan path folder yang benar.")