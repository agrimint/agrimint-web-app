import Link from "next/link";
import { Loader, IconButton } from "../../../../components";
import { useRouter } from "next/router";
import { projects, formatCurrency, formatPercentage, formatDate } from "../../data";

export default function Loan() {
  const router = useRouter();
  const { projectId, loanId } = router.query;
  const project = projects.find(project => project._id == projectId);
  const loan = project?.loans?.find(loan => loan._id == loanId);

  const handleBackClick = async (e) => {
    e.preventDefault();
    router.push("/projects/" + projectId);    
  }

  return (
    <div className="px-2 py-8">
      {!loan?._id ? <Loader /> :
      <>
        <IconButton iconName="<" label="Project" className="text-teal-600" onClick={handleBackClick} />
        <h1 className="text-3xl font-semibold my-5">Loan for {project.title}</h1>
        <div className="w-auto px-4 py-5 my-4 flex flex-col rounded-lg bg-white shadow">
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
        <h2 className="w-full border-b border-gray-100 p-4 text-center text-sm font-semibold uppercase text-gray-500">Payments</h2>
        <div className="mb-4 flex flex-col rounded-lg bg-white shadow">
        {loan.payments?.map((payment, i) => (
          <div key={i} className={`flex ${(i < loan.payments.length - 1) && `border-b`} p-4`}>
            <div className="flex-1">
              <p className="">{formatDate(payment.date)}</p>
            </div>
            <p className="my-auto mr-auto">{formatCurrency(payment.amount)}</p>
          </div>))}
        </div>
      </>}
    </div>
  )
}