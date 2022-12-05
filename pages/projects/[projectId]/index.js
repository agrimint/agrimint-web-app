import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Checkbox, IconButton, Loader } from "../../../components";
import { projects, formatCurrency, formatPercentage } from '../data';

export default function Project() {
  const router = useRouter();
  const { projectId } = router.query;
  const project = projects.find(project => project._id == projectId);
  
  const handleBackClick = async (e) => {
    e.preventDefault();
    router.push('/projects')
  }

  return (
    <div className="px-2 py-8">
      {!project?._id ? <Loader /> :
      <>
        <IconButton iconName="<" label="All projects" className="text-teal-600" onClick={handleBackClick} />
        <h1 className="text-3xl font-semibold my-5">{project.title}</h1>
        <div className="w-full flex py-4 border-b border-gray-200">
          <p className="my-auto text-gray-500">Amount</p>
          <p className="my-auto ml-auto font-bold">{formatCurrency(project.amountMin)}-{formatCurrency(project.amountMax)}</p>
        </div>
        <div className="w-full flex py-4 border-b border-gray-200">
          <p className="my-auto text-gray-500">Duration</p>
          <p className="my-auto ml-auto font-bold">{project.durationMin}-{project.durationMax} months</p>
        </div>
        <div className="w-full flex py-4 border-b border-gray-200">
          <p className="my-auto text-gray-500">Interest rate</p>
          <p className="my-auto ml-auto font-bold">{formatPercentage(project.interestRate)}</p>
        </div>
        <div className="w-full flex py-4">
          <p className="my-auto text-gray-500">Merchant</p>
          <p className="my-auto ml-auto font-bold">{project.merchant}</p>
        </div>
        {project.status === "eligible" && <div className="w-auto px-4 py-5 my-4 flex flex-col rounded-lg bg-white shadow">
          <h3 className="text-base font-bold">Eligibility</h3>
          <p className="text-gray-700 mb-5">Based on your credentials, you are eligible for the following conditions:</p>
          <div className="w-full flex py-4 border-b border-gray-200">
            <p className="my-auto text-gray-500">Amount</p>
            <p className="my-auto ml-auto font-bold">{formatCurrency(project.eligibility?.amount)}</p>
          </div>
          <div className="w-full flex py-4 border-b border-gray-200">
            <p className="my-auto text-gray-500">Duration</p>
            <p className="my-auto ml-auto font-bold">{project.eligibility?.duration} months</p>
          </div>
          <div className="w-full flex py-4 border-b border-gray-200">
            <p className="my-auto text-gray-500">Interest rate</p>
            <p className="my-auto ml-auto font-bold">{formatPercentage(project.eligibility?.interestRate)}</p>
          </div>
          <div className="w-full py-4">
            <Checkbox label={<><span>I agree with the </span><Link className="text-teal-600" href="/">Terms and Conditions</Link></>} />
          </div>
          <Button label="Apply" />
        </div>}
        {project.status === "disbursed" && project.loans.map((loan, i) => <Link key={i} href={`/projects/${project._id}/loans/${loan._id}`}>
          <div className="w-auto px-4 py-5 my-4 flex flex-col rounded-lg bg-white shadow">
            <h3 className="text-xl font-bold">Loan</h3>
            <p className="text-gray-500 mb-5">Due in {Math.round((new Date(loan.endDate) / (24 * 3600 * 1000)) - (new Date() / (24 * 3600 * 1000)))} days</p>
            <div className="grid grid-cols-3">
              <div>
                <p className="text-gray-500">Total due</p>
                <p className="font-bold">{formatCurrency(loan.totalDue)}</p>
              </div>
              <div>
                <p className="text-gray-500">Repaid</p>
                <p className="font-bold">{formatCurrency(loan.repaid)}</p>
              </div>
              <div>
                <p className="text-gray-500">Remaining</p>
                <p className="font-bold">{formatCurrency(loan.totalDue - loan.repaid)}</p>
              </div>
            </div>
          </div>
        </Link>)}
      </>}
    </div>
  )
}