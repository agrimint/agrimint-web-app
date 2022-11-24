import { useSession } from "next-auth/react";
import { BottomNavigation, Button, Loader } from '../../components';
import { useRouter } from "next/router";
import { onboardingFlow } from "/redux/onboardingSlice";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "/util/users";
import { useState, useEffect } from "react";
import { handleUserProgress } from "/util/users";
// import Confetti from 'react-confetti';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const onboardingState = useSelector(state => state.onboarding);
  const step = useSelector(state => state.onboarding.step);
  const signedIn = useSelector(state => state.user.signedIn);
  const userDataFetched = useSelector(state => state.user.userDataFetched);
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    } else if (!loggingOut) {
      handleUserProgress(dispatch, router, session, status, signedIn, userDataFetched, onboardingFlow, onboardingState, step, setError);
    }
  }, [session, status, signedIn, userDataFetched, step]);

  // const handleSignOut = async (e) => {
  //   e.preventDefault();
  //   setLoggingOut(true);
  //   await signOutUser(dispatch);
  //   router.push("/");
  // }

  return (
    <>
      {(status === "loading") && <Loader />}
      <div class="w-full bg-teal-600">
        <div class="px-4 py-8">
          <h2 class="mb-1 text-sm font-light text-teal-100">Total balance</h2>
          <p class="mb-8 text-4xl font-bold text-white">$520.00</p>
          <div class="mb-4 flex flex-col rounded-lg bg-teal-50">
            <div class="flex border-b p-4">
              <svg class="my-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10.6663C4 12.1391 5.19391 13.333 6.66667 13.333H9.33333C10.8061 13.333 12 12.1391 12 10.6663C12 9.19358 10.8061 7.99967 9.33333 7.99967H6.66667C5.19391 7.99967 4 6.80577 4 5.33301C4 3.86025 5.19391 2.66634 6.66667 2.66634H9.33333C10.8061 2.66634 12 3.86025 12 5.33301M8 1.33301V14.6663" stroke="#111827" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="my-auto ml-2 font-bold">20.00</p>
              <p class="my-auto ml-2 text-sm text-gray-500">USD</p>
              <svg class="my-auto ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#134E4A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="flex border-b p-4">
              <svg class="my-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.33268 1.33301V2.66634M6.33268 13.333V14.6663M8.99935 1.33301V2.66634M8.99935 13.333V14.6663M4.99935 2.66634H9.33268C10.8054 2.66634 11.9993 3.86025 11.9993 5.33301C11.9993 6.80577 10.8054 7.99967 9.33268 7.99967H4.99935H9.99935C11.4721 7.99967 12.666 9.19358 12.666 10.6663C12.666 12.1391 11.4721 13.333 9.99935 13.333H4.99935M4.99935 2.66634H3.66602M4.99935 2.66634V13.333M4.99935 13.333H3.66602" stroke="#111827" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="my-auto ml-2 font-bold">5 558 000</p>
              <p class="my-auto ml-2 text-sm text-gray-500">SATS</p>
              <svg class="my-auto ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#134E4A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="flex p-4">
              <svg class="my-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14H6M10 14H12M11.6667 4.33333V9.66667M2 4.13333L2 9.86667C2 10.6134 2 10.9868 2.14532 11.272C2.27316 11.5229 2.47713 11.7268 2.72801 11.8547C3.01323 12 3.3866 12 4.13333 12L11.8667 12C12.6134 12 12.9868 12 13.272 11.8547C13.5229 11.7268 13.7268 11.5229 13.8547 11.272C14 10.9868 14 10.6134 14 9.86667V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14533C12.9868 2 12.6134 2 11.8667 2L4.13333 2C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333ZM7.66667 7C7.66667 7.92047 6.92047 8.66667 6 8.66667C5.07953 8.66667 4.33333 7.92047 4.33333 7C4.33333 6.07953 5.07953 5.33333 6 5.33333C6.92047 5.33333 7.66667 6.07953 7.66667 7Z" stroke="#111827" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="my-auto ml-2 font-bold">10 000 000</p>
              <p class="my-auto ml-2 text-sm text-gray-500">SATS</p>
              <svg class="my-auto ml-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#134E4A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        <div class="rounded-tl-xl rounded-tr-xl bg-white">
          <h2 class="w-full border-b border-gray-100 p-4 text-center text-sm font-bold uppercase text-gray-400">Latest transactions</h2>
          <div class="flex flex-col pb-32">
            <div class="flex w-full border-b border-gray-100 px-6 py-3">
              <svg class="my-auto stroke-gray-900" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15L15 5M15 5H8.33333M15 5V11.6667" stroke-width="1.68595" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="ml-6 flex-1">
                <p class="py-1 text-sm font-bold">Tunde</p>
                <p class="text-sm text-gray-500">11:42 AM - Today</p>
              </div>
              <p class="my-auto mr-auto font-bold text-red-600">– $2.55</p>
            </div>
            <div class="flex w-full border-b border-gray-100 px-6 py-3">
              <svg class="my-auto stroke-gray-900" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.91732 1.66699V3.33366M7.91732 16.667V18.3337M11.2507 1.66699V3.33366M11.2507 16.667V18.3337M6.25065 3.33366H11.6673C13.5083 3.33366 15.0007 4.82604 15.0007 6.66699C15.0007 8.50794 13.5083 10.0003 11.6673 10.0003H6.25065H12.5007C14.3416 10.0003 15.834 11.4927 15.834 13.3337C15.834 15.1746 14.3416 16.667 12.5007 16.667H6.25065M6.25065 3.33366H4.58398M6.25065 3.33366V16.667M6.25065 16.667H4.58398" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="ml-6 flex-1">
                <p class="py-1 text-sm font-bold">Obi</p>
                <p class="text-sm text-gray-500">11:08 AM - Today</p>
              </div>
              <p class="my-auto mr-auto font-bold text-green-600">+ 12 550</p>
            </div>
            <div class="flex w-full border-b border-gray-100 px-6 py-3">
              <svg class="my-auto stroke-gray-900" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L15 15M15 15V8.33333M15 15H8.33333" stroke="#111827" stroke-width="1.68595" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="ml-6 flex-1">
                <p class="py-1 text-sm font-bold">Obi</p>
                <p class="text-sm text-gray-500">10:59 AM - Today</p>
              </div>
              <p class="my-auto mr-auto font-bold text-green-600">+ $12.25</p>
            </div>
            <div class="flex w-full border-b border-gray-100 px-6 py-3">
              <svg class="my-auto stroke-gray-900" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15L15 5M15 5H8.33333M15 5V11.6667" stroke-width="1.68595" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="ml-6 flex-1">
                <p class="py-1 text-sm font-bold">Tunde</p>
                <p class="text-sm text-gray-500">9:12 AM - Today</p>
              </div>
              <p class="my-auto mr-auto font-bold text-red-600">– $6.90</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-rows fixed bottom-20 flex w-full">
        <div class="flex-1"></div>
        <div class="rounded-full bg-gray-700 text-white opacity-90">
          <div class="flex flex-row">
            <div class="whitespace-no-wrap flex flex-grow flex-row items-center justify-center border-r border-gray-600 px-4 py-2">
              <svg class="my-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L12 4M12 4H6.66667M12 4V9.33333" stroke="white" stroke-width="1.34876" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="my-auto ml-2">Send</p>
            </div>
            <div class="whitespace-no-wrap flex flex-grow flex-row items-center justify-center border-r border-gray-600 px-4 py-2">
              <svg class="my-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66667 2.66699V13.3337M4.66667 13.3337L2 10.667M4.66667 13.3337L7.33333 10.667M11.3333 13.3337V2.66699M11.3333 2.66699L8.66667 5.33366M11.3333 2.66699L14 5.33366" stroke="white" stroke-width="1.34876" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="my-auto ml-2">Transfer</p>
            </div>
            <div class="whitespace-no-wrap flex flex-grow flex-row items-center justify-center px-4 py-2">
              <svg class="my-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 12M12 12V6.66667M12 12H6.66667" stroke="white" stroke-width="1.34876" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="my-auto ml-2">Receive</p>
            </div>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </>
  );
}