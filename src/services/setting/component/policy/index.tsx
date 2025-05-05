const PolicySection = () => {
  return (
    <div className="w-full max-w-md px-5 py-4 bg-white rounded-xl border border-main flex flex-col gap-4">
      <div className="text-lg font-medium text-font-color">
        Terms and Policies
      </div>

      <div className="bg-third rounded-xl border border-main px-5 py-3">
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold text-font-color">
            Terms of Service
          </div>
          <div className="text-sm text-font-color2">Ver 2.1.0</div>
        </div>
      </div>

      <div className="bg-third rounded-xl border border-main px-5 py-3">
        <div className="flex flex-col gap-1">
          <div className="text-base font-semibold text-font-color">
            Privacy Policy
          </div>
          <div className="text-sm text-font-color2">Ver 2.1.0</div>
        </div>
      </div>

      <div className="text-sm text-font-color">
        Last updated: February 15, 2024
      </div>
    </div>
  );
};

export default PolicySection;
