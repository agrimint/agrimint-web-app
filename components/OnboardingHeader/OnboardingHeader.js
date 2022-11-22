import { useSelector, useDispatch } from "react-redux";
import { previousStep } from "../../redux/onboardingSlice";
import { IconButton } from "..";

const OnboardingHeader = () => {
  const step = useSelector(state => state.onboarding.step);
  const lastStep = useSelector(state => state.onboarding.lastStep);
  const dispatch = useDispatch();
  
  // TODO: Some logic about when we can go back
  let canGoBack = false;
  if (step < 3) canGoBack = true;
  if (step === 4) canGoBack = true;

  const handleBackClick = async (e) => {
    e.preventDefault();
    // TODO:
  }

  return (
    <div className="flex flex-row py-4">
      <div className="flex flex-auto justify-center h-4 mt-2">
        {Array.from({length: lastStep}, (_, i) => i + 1).map((s, i) => 
          <div key={i} className={`mr-[2px] h-2 ${(i + 1 === step) ? "w-5" : "w-2"} rounded-full ${(i + 1 <= step) ? "bg-teal-600" : "bg-gray-300"}`}></div>
        )}
      </div>
      <div className="absolute top-4 right-4">
        {canGoBack && <IconButton iconName="x" onClick={handleBackClick} />}
      </div>
    </div>
  )
};

export default OnboardingHeader;