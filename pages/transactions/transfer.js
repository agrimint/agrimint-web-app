import { IconButton } from "../../components";
import { useRouter } from "next/router";

export default function Transfer() {
  const router = useRouter();

  const handleBackClick = async (e) => {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <>
      <div className="absolute top-4 left-4">
        <IconButton iconName="<-" onClick={handleBackClick} />
      </div>
      <h1 className="text-3xl text-center font-bold py-5">Transfer</h1>
    </>
  );
}