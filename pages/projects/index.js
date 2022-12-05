import Link from "next/link";
import { IconButton } from "../../components";
import { useRouter } from "next/router";
import { projects, formatCurrency, formatPercentage } from "./data";

export default function Projects() {
  const router = useRouter();

  const handleBackClick = async (e) => {
    e.preventDefault();
    router.push('/dashboard/loans')
  }
  
  return (
    <div className="px-2 py-8">
      {/* <Loader /> */}
      <div>
        <IconButton iconName="<" label="Projects & loans" className="text-teal-600" onClick={handleBackClick} />
      </div>
      <h1 className="text-3xl font-semibold my-5">Projects</h1>
      {/* <h2 className="w-full text-sm font-semibold uppercase text-gray-500 mt-10 mb-3">Projects you are eligible for</h2> */}
      {projects.map((project, i) => {
        return (
          <div key={i}>
            <Link href={"/projects/" + project._id}>
              <div className="w-auto px-4 py-5 mb-4 flex flex-col rounded-lg bg-white shadow">
                <h3 className="text-base font-bold">{project.title}</h3>
                <p className="text-gray-500 mb-5">{project.durationMin}-{project.durationMax} months</p>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-gray-500">Loan amount</p>
                    <p className="font-bold">{formatCurrency(project.amountMin)}-{formatCurrency(project.amountMax)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Interest rate</p>
                    <p className="font-bold">{formatPercentage(project.interestRate)}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}