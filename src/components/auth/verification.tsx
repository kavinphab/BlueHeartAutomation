import { FormEvent } from "react";
import { Label } from "../ui/label";
// import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void;
  code: string;
  setCode: (value: string) => void;
}

const Verification = ({ handleVerify, code, setCode }: VerifyFormProps) => {
  return (
    <div className="h-auto bg-white w-full md:w-1/4 justify-items-center">
      <h1 className="font-bold text-2xl">Verify your email</h1>
      <form onSubmit={handleVerify} className="space-y-3 text-center">
        <div className="space-y-2">
          <Label id="code">Enter your verification code</Label>
          {/* <Input
          value={code}
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        /> */}
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            id="code"
            name="code"
            onChange={(value) => setCode(value)}
          >
            {[0, 1].map((groupIndex) => (
              <InputOTPGroup key={groupIndex}>
                {[0, 1, 2].map((slotIndex) => (
                  <InputOTPSlot
                    key={slotIndex}
                    index={groupIndex * 3 + slotIndex}
                  />
                ))}
              </InputOTPGroup>
            ))}
          </InputOTP>
        </div>
        <div className="flex justify-center">
          <Button variant="ttickle" type="submit">
            Verify
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Verification;
