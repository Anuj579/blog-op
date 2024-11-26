import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to my blog!</h1>
      <Link href='/auth/signup'>
        Signup
      </Link>
    </div>
  );
}
