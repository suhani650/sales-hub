import {
  FaInfoCircle,
  FaTags,
  FaRupeeSign,
  FaWarehouse,
  FaImages,
  FaLayerGroup,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Basic Info",
    icon: <FaInfoCircle />,
  },
  {
    id: 2,
    title: "Category",
    icon: <FaTags />,
  },
  {
    id: 3,
    title: "Pricing",
    icon: <FaRupeeSign />,
  },
  {
    id: 4,
    title: "Inventory",
    icon: <FaWarehouse />,
  },
  {
    id: 5,
    title: "Images",
    icon: <FaImages />,
  },
  {
    id: 6,
    title: "Variants",
    icon: <FaLayerGroup />,
  },
  {
    id: 7,
    title: "Shipping",
    icon: <FaTruck />,
  },
  {
    id: 8,
    title: "Preview",
    icon: <FaCheckCircle />,
  },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-6">
      <div className="flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step */}

            <div className="flex flex-col items-center min-w-[100px]">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg transition-all duration-300
                ${
                  currentStep > step.id
                    ? "bg-green-500 text-white"
                    : currentStep === step.id
                      ? "bg-blue-600 text-white scale-110 shadow-lg"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.icon}
              </div>

              <span
                className={`mt-3 text-sm font-semibold text-center ${
                  currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Line */}

            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Step {currentStep} of {steps.length}
          </span>

          <span>
            {Math.round((currentStep / steps.length) * 100)}% Completed
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
