import { Button } from "../ui/button";
import { Card } from "../ui/card";

const ResumeUploader = () => {
  return (
    <Card className="p-5 flex flex-col gap-5">
      <h3 className="text-lg font-semibold">Use Resume</h3>
      <div>
        <Button>Upload Resume</Button>
      </div>
    </Card>
  );
};

export default ResumeUploader;
