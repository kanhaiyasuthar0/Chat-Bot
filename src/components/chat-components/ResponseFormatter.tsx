import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
// import { RxClipboardCopy } from "react-icons/rx";
const ResponseFormatter = ({
  exchange,
  getResponse,
  copyToClipboard,
}: {
  exchange?: {
    youtube_url: string;
    query_response: string;
    condensed_question: string;
    follow_up_questions: string[];
    query: string;
  };
  getResponse: (inputString: string) => void;
  copyToClipboard?: (inputString: string) => void;
}) => {
  console.log("🚀 ~ copyToClipboard:", copyToClipboard);
  console.log(exchange);
  return (
    <div className="text-left mt-2">
      <div className="w-full flex flex-col gap-2 align-middle dark:bg-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 shadow">
        <div className="flex gap-5 items-start">
          <div className="">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>FC</AvatarFallback>
            </Avatar>{" "}
          </div>
          <p>{exchange?.query_response}</p>
          {/* <button
            onClick={() => copyToClipboard(exchange?.query_response || "")}
            className="ml-4 w-fit px-2 py-1 text-xs text-gray-600 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded"
          >
            <RxClipboardCopy />
          </button> */}
        </div>

        <div className="flex-col pl-14">
          {exchange?.youtube_url && (
            <div className="aspect-w-16 aspect-h-9 mt-2">
              <iframe
                src={exchange?.youtube_url.replace("watch?v=", "embed/")}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-64 h-full rounded-lg overflow-hidden"
              ></iframe>
            </div>
          )}
          {/* Follow-up Questions */}
          {exchange?.follow_up_questions &&
            exchange?.follow_up_questions?.length > 0 && (
              <div className="mt-5">
                <p className="font-semibold">Follow-up Questions:</p>
                <ul className="list-inside list">
                  {exchange?.follow_up_questions.map((question, index) => (
                    <li key={index}>{index + 1 + ". " + question}</li>
                  ))}
                </ul>
              </div>
            )}

          <div className="flex flex-wrap align-middle justify-center gap-2">
            {exchange?.follow_up_questions.map((question, index) => (
              <Button
                type="submit"
                className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#1a1a1a] border border-white outline-none text-white rounded disabled:bg-[#171717] focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                //   disabled={!inputText.trim()}
                onClick={() => getResponse(question.trim())}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          {/* YouTube URL - Conditional Rendering */}
        </div>
      </div>
    </div>
  );
};

export default ResponseFormatter;
