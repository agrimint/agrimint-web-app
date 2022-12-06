import { Loader } from "../../components";
import Link from "next/link";
import { projects, formatCurrency, formatPercentage } from "../../util/data";

export default function Loans() {
  let eligibleProjects = [];
  let currentLoans = [];
  projects.forEach(project => {
    if (project.status === "eligible") eligibleProjects.push(project);
    if (project.status === "disbursed") project.loans.forEach(loan => currentLoans.push({...loan, projectId: project._id, projectTitle: project.title}));
  });
  // console.log(eligibleProjects);
  // console.log(currentLoans);

  return (
    <div className="px-2 py-8">
      <h1 className="text-3xl font-semibold">Projects & Loans</h1>
      <h2 className="w-full text-sm font-semibold uppercase text-gray-500 mt-10 mb-3">Projects you are eligible for</h2>
      {eligibleProjects?.map((project, i) => <Link key={i} href={`/projects/${project._id}`}>
        <div className="w-auto px-4 py-5 mb-4 flex flex-col rounded-lg bg-white shadow">
          <h3 className="text-xl font-bold">{project.title}</h3>
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
      </Link>)}
      <h2 className="w-full text-sm font-semibold uppercase text-gray-500 mt-10 mb-3">My loans</h2>
      
      {currentLoans?.map((loan, i) => <Link key={i} href={`/projects/${loan.projectId}/loans/${loan._id}`}>
        <div className="w-auto px-4 py-5 mb-4 flex flex-col rounded-lg bg-white shadow">
          <h3 className="text-xl font-bold">{loan.projectTitle}</h3>
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
    </div>
  );
}