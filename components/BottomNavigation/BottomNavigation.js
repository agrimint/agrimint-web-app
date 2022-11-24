import Link from "next/link";

const BottomNavigation = ({ activeTab = "dashboard" }) => {
  return (
    <nav className="fixed bottom-0 flex w-full overflow-x-auto border bg-white">
      <Link href="/dashboard" className={`whitespace-no-wrap flex flex-1 flex-grow flex-col items-center justify-center overflow-hidden py-2 text-sm ${activeTab === "dashboard" ? `text-teal-600` : `text-gray-400`} transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeTab === "dashboard" ? `focus:text-teal-600` : `focus:text-gray-400`}`}>
        <svg className={activeTab === "dashboard" ? "fill-teal-600" : "fill-gray-400"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.2929 2.29289C11.6534 1.93241 12.2207 1.90468 12.613 2.2097L12.7072 2.29289L21.7072 11.2929C22.3097 11.8955 21.9277 12.9072 21.1137 12.994L21.0001 13H20.0001V19C20.0001 20.5977 18.7511 21.9037 17.1763 21.9949L17.0001 22H15.0001H9.00005H7.00005C5.40237 22 4.09639 20.7511 4.00514 19.1763L4.00005 19V13H3.00005C2.14788 13 1.70262 12.0145 2.21683 11.3775L2.29294 11.2929L11.2929 2.29289ZM10.0001 20H14.0001V15C14.0001 14.4872 13.614 14.0645 13.1167 14.0067L13.0001 14H11.0001C10.4872 14 10.0645 14.386 10.0068 14.8834L10.0001 15V20ZM16.0001 20V15L15.995 14.8237C15.9037 13.2489 14.5977 12 13.0001 12H11.0001L10.8238 12.0051C9.24897 12.0963 8.00005 13.4023 8.00005 15V20H7.00005L6.88343 19.9933C6.38609 19.9355 6.00005 19.5128 6.00005 19V12L5.99332 11.8834C5.95333 11.5391 5.73845 11.2481 5.43983 11.1016C5.41091 11.0875 5.38121 11.0746 5.35081 11.0632L12.0001 4.415L18.6486 11.0635C18.6184 11.0748 18.589 11.0876 18.5603 11.1016L18.5603 11.1016C18.2285 11.2644 18.0001 11.6055 18.0001 12V19L17.9933 19.1166C17.9356 19.614 17.5129 20 17.0001 20H16.0001Z" />
        </svg>
        <span className="text-sm capitalize">Home</span>
      </Link>

      <Link href="/dashboard/accounts" className={`whitespace-no-wrap flex flex-1 flex-grow flex-col items-center justify-center overflow-hidden py-2 text-sm ${activeTab === "accounts" ? `text-teal-600` : `text-gray-400`} transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeTab === "accounts" ? `focus:text-teal-600` : `focus:text-gray-400`}`}>
        <svg className={activeTab === "accounts" ? "fill-teal-600" : "fill-gray-400"} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16.5 3C17.5544 3 18.4182 3.81588 18.4945 4.85074L18.5 5V7C19.5544 7 20.4182 7.81588 20.4945 8.85074L20.5 9V11C21.0128 11 21.4355 11.386 21.4933 11.8834L21.5 12V16C21.5 16.5128 21.114 16.9355 20.6166 16.9933L20.5 17V19C20.5 20.0544 19.6841 20.9182 18.6493 20.9945L18.5 21H6.5C4.90232 21 3.59634 19.7511 3.50509 18.1763L3.5 18V6C3.5 4.40232 4.74892 3.09634 6.32373 3.00509L6.5 3H16.5ZM19.5 15V13H16.5C15.9872 13 15.5645 13.386 15.5067 13.8834L15.5 14C15.5 14.5128 15.886 14.9355 16.3834 14.9933L16.5 15H19.5ZM18.5 11H16.5L16.3237 11.0051C14.7489 11.0963 13.5 12.4023 13.5 14C13.5 15.6569 14.8431 17 16.5 17H18.5V19H6.5L6.38338 18.9933C5.88604 18.9355 5.5 18.5128 5.5 18L5.50009 8.82933C5.81284 8.93986 6.1494 9 6.5 9H18.5V11ZM16.5 5H6.5C5.94772 5 5.5 5.44772 5.5 6C5.5 6.51284 5.88604 6.93551 6.38338 6.99327L6.5 7H16.5V5Z" />
        </svg>
        <span className="text-sm capitalize">Accounts</span>
      </Link>

      <Link href="/dashboard/vault" className={`whitespace-no-wrap flex flex-1 flex-grow flex-col items-center justify-center overflow-hidden py-2 text-sm ${activeTab === "vault" ? `text-teal-600` : `text-gray-400`} transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeTab === "vault" ? `focus:text-teal-600` : `focus:text-gray-400`}`}>
        <svg className={activeTab === "vault" ? "stroke-teal-600" : "stroke-gray-400"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 21H9M15 21H18M17.5 6.5V14.5M3 6.2L3 14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18L17.8 18C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40974 19.908 3.21799C19.4802 3 18.9201 3 17.8 3L6.2 3C5.0799 3 4.51984 3 4.09202 3.21799C3.7157 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2ZM11.5 10.5C11.5 11.8807 10.3807 13 9 13C7.61929 13 6.5 11.8807 6.5 10.5C6.5 9.11929 7.61929 8 9 8C10.3807 8 11.5 9.11929 11.5 10.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm capitalize">Vault</span>
      </Link>

      <Link href="/dashboard/members" className={`whitespace-no-wrap flex flex-1 flex-grow flex-col items-center justify-center overflow-hidden py-2 text-sm ${activeTab === "members" ? `text-teal-600` : `text-gray-400`} transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeTab === "members" ? `focus:text-teal-600` : `focus:text-gray-400`}`}>
        <svg className={activeTab === "members" ? "fill-teal-600" : "fill-gray-400"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9 2C6.23858 2 4 4.23858 4 7C4 9.76142 6.23858 12 9 12C11.7614 12 14 9.76142 14 7C14 4.23858 11.7614 2 9 2ZM9 4C10.6569 4 12 5.34315 12 7C12 8.65685 10.6569 10 9 10C7.34315 10 6 8.65685 6 7C6 5.34315 7.34315 4 9 4ZM15.9954 18.7831C15.8818 16.1223 13.6888 14 11 14H7L6.78311 14.0046C4.12231 14.1182 2 16.3112 2 19V21L2.00673 21.1166C2.06449 21.614 2.48716 22 3 22C3.55228 22 4 21.5523 4 21V19L4.00509 18.8237C4.09634 17.2489 5.40232 16 7 16H11L11.1763 16.0051C12.7511 16.0963 14 17.4023 14 19V21L14.0067 21.1166C14.0645 21.614 14.4872 22 15 22C15.5523 22 16 21.5523 16 21V19L15.9954 18.7831ZM15.0312 2.88196C15.1682 2.34694 15.713 2.02426 16.248 2.16125C18.4604 2.72771 20.0078 4.72124 20.0078 7.005C20.0078 9.28876 18.4604 11.2823 16.248 11.8487C15.713 11.9857 15.1682 11.6631 15.0312 11.128C14.8943 10.593 15.2169 10.0482 15.752 9.91125C17.0794 9.57137 18.0078 8.37526 18.0078 7.005C18.0078 5.63474 17.0794 4.43863 15.752 4.09875C15.2169 3.96176 14.8943 3.41699 15.0312 2.88196ZM18.25 14.1817C17.7152 14.0437 17.1698 14.3653 17.0317 14.9C16.8937 15.4348 17.2153 15.9802 17.75 16.1182C19.0684 16.4586 19.9922 17.6442 20 19.0057L20 21L20.0067 21.1166C20.0645 21.614 20.4872 22 21 22C21.5523 22 22 21.5523 22 21V19L21.9936 18.7735C21.8836 16.5948 20.374 14.7301 18.25 14.1817Z" />
        </svg>
        <span className="text-sm capitalize">Members</span>
      </Link>

      <Link href="/dashboard/settings" className={`whitespace-no-wrap flex flex-1 flex-grow flex-col items-center justify-center overflow-hidden py-2 text-sm ${activeTab === "settings" ? `text-teal-600` : `text-gray-400`} transition-colors duration-100 ease-in-out hover:bg-gray-200 ${activeTab === "settings" ? `focus:text-teal-600` : `focus:text-gray-400`}`}>
        <svg className={activeTab === "settings" ? "fill-teal-600" : "fill-gray-400"} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.35315 4.08124C9.23706 4.55865 8.69389 4.78376 8.27248 4.52754C5.83391 3.04292 3.04354 5.83396 4.52896 8.27226C4.64951 8.46998 4.66835 8.713 4.57986 8.9266C4.49137 9.14019 4.30618 9.29868 4.08148 9.35312C1.30622 10.0264 1.30622 13.9736 4.08121 14.6468C4.30516 14.7013 4.49012 14.8597 4.57851 15.0732C4.6669 15.2867 4.64811 15.5295 4.52792 15.7268C3.04288 18.1661 5.83393 20.9564 8.27223 19.471C8.46995 19.3505 8.71296 19.3316 8.92656 19.4201C9.14016 19.5086 9.29864 19.6938 9.35309 19.9185C10.0264 22.6937 13.9736 22.6937 14.6468 19.9188C14.7012 19.6948 14.8597 19.5098 15.0732 19.4215C15.2866 19.3331 15.5295 19.3519 15.7268 19.472C18.166 20.9571 20.9564 18.166 19.471 15.7277C19.3504 15.53 19.3316 15.287 19.4201 15.0734C19.5086 14.8598 19.6937 14.7013 19.9184 14.6469C22.6937 13.9736 22.6937 10.0264 19.9187 9.35319C19.6948 9.29873 19.5098 9.14027 19.4214 8.92681C19.333 8.71334 19.3518 8.47051 19.472 8.2732C20.9571 5.83394 18.166 3.04357 15.7277 4.52899C15.53 4.64955 15.287 4.66839 15.0734 4.5799C14.8598 4.4914 14.7013 4.30622 14.6468 4.08124C13.9736 1.30625 10.0264 1.30625 9.35315 4.08124ZM12.7031 4.55248C12.9079 5.3979 13.5042 6.09465 14.3079 6.4276C15.1115 6.76055 16.0258 6.68966 16.7685 6.23681C17.3881 5.85937 18.0943 6.52202 17.809 7.14796L17.7638 7.23298C17.3117 7.97519 17.241 8.88882 17.5736 9.69195C17.9061 10.4951 18.602 11.0913 19.4467 11.2967C20.1842 11.4756 20.1842 12.5244 19.4472 12.7032C18.6021 12.908 17.9053 13.5043 17.5724 14.3079C17.2394 15.1115 17.3103 16.0259 17.7632 16.7686C18.1406 17.3882 17.4779 18.0943 16.852 17.809L16.767 17.7638C16.0248 17.3118 15.1111 17.241 14.308 17.5736C13.5049 17.9062 12.9087 18.6021 12.7033 19.4467C12.5244 20.1843 11.4756 20.1843 11.2968 19.4472C11.092 18.6021 10.4957 17.9054 9.69207 17.5724C8.88843 17.2395 7.9741 17.3103 7.23138 17.7632C6.61181 18.1406 5.90564 17.478 6.19097 16.852L6.23612 16.767C6.6882 16.0248 6.75892 15.1112 6.42636 14.308C6.0938 13.5049 5.39791 12.9087 4.55326 12.7033C3.81571 12.5244 3.81571 11.4756 4.55272 11.2968C5.39787 11.092 6.09461 10.4957 6.42756 9.6921C6.76051 8.88846 6.68962 7.97413 6.23678 7.23142C5.84218 6.58368 6.58438 5.8413 7.23295 6.23616C8.81116 7.19571 10.8606 6.34635 11.2966 4.55329C11.4662 3.85457 12.4164 3.81779 12.6679 4.44251L12.7031 4.55248ZM12 8C9.79083 8 7.99997 9.79086 7.99997 12C7.99997 14.2091 9.79083 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM12 10C13.1045 10 14 10.8954 14 12C14 13.1046 13.1045 14 12 14C10.8954 14 9.99997 13.1046 9.99997 12C9.99997 10.8954 10.8954 10 12 10Z" />
        </svg>
        <span className="text-sm capitalize">Settings</span>
      </Link>
    </nav>
  );
}

export default BottomNavigation;