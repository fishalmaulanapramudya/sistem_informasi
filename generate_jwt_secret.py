import argparse
from pathlib import Path
import secrets


def generate_jwt_secret(length: int = 64) -> str:
    """Generate a secure random JWT secret."""
    return secrets.token_urlsafe(length)


def write_to_env(path: str = ".env", key: str = "JWT_SECRET") -> str:
    env_file = Path(path)
    secret = generate_jwt_secret()

    lines = []
    if env_file.exists():
        lines = env_file.read_text(encoding="utf-8").splitlines()

    existing = False
    new_lines = []
    for line in lines:
        if line.startswith(f"{key}="):
            new_lines.append(f"{key}={secret}")
            existing = True
        else:
            new_lines.append(line)

    if not existing:
        new_lines.append(f"{key}={secret}")

    env_file.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
    return secret


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a secure JWT secret.")
    parser.add_argument("--save", action="store_true", help="Simpan secret ke file .env")
    parser.add_argument("--file", default=".env", help="Nama file .env jika --save dipakai")
    parser.add_argument("--key", default="JWT_SECRET", help="Nama key di .env")
    args = parser.parse_args()

    secret = generate_jwt_secret()

    if args.save:
        secret = write_to_env(path=args.file, key=args.key)

    print(f"{args.key}={secret}")
