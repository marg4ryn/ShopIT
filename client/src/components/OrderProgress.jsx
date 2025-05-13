export default function OrderProgress({ currentStep }) {
  const steps = ['Cart', 'Shipment', 'Payment', 'Summary'];
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-2 w-20">

      <div className="dlex pt-1">
        <div className="flex">
            <div className="h-120 w-2 bg-gray-400 rounded-full">
                <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ height: `${progress}%` }}
                ></div>
            </div>
        </div>
      </div>      
      
      <div className="mt-8">
        <ul className="space-y-16">
            {steps.map((step, index) => (
            <li key={index} className="flex flex-col items-center">
                <div
                className={`w-8 h-8 rounded-full ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-400'
                } flex items-center justify-center text-white font-bold`}
                >
                {index + 1}
                </div>
                <p className="text-sm font-semibold mt-2">{step}</p>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
}
