import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Separator } from "../ui/separator";

export default function Post() {
    const [postVotes, setPostVotes] = useState(100);
    const [upVoteBarLength, setUpVoteBarLength] = useState("w-[100px]");

    const upVotePost = () => {
        console.log("Upvoted Post");
        setPostVotes(postVotes + 1);
    }

    const getUpVoteBarLength = () => {
        if (postVotes > 0 && postVotes < 100) {

        }
    }

    return (
        <div className="flex flex-col w-full h-full place-content-center place-items-center">
            <article className="flex flex-col size-screen place-items-center">
                <section className="post-img w-3/4 p-4">
                    <img src="https://source.unsplash.com/random/350x350" alt="Random Image" className="w-full h-full object-cover rounded-md" />
                </section>
                <section className="post-details text-center p-4">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight place-item-end">
                        Post by JaJa
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-1 place-item-start">
                        Corvallis, OR
                    </p>
                </section>

                {/* TODO: possibly move this out to be it's own component, so Post doesnt have to keep track up PostVote state? */}
                <section className=" flex flex-row justify-center post-metrics border-slate-400 border-solid border-[1px] rounded-full p-1 hover:border-slate-800 hover:bg-secondary transition-all">
                    <div className={`${upVoteBarLength} grid grid-cols-2 divide-x text-center`}>
                        <div>
                            <Button onClick={upVotePost} variant="ghost" className="p-2 m-0 rounded-full hover:bg-popover">
                                <ThumbsUp className="size-5 " />
                            </Button>
                        </div>
                        {/* <Separator orientation="vertical" className="h-full -mx-95" /> */}
                        <div className="flex flex-col justify-center place-items-center">
                            <p className="text-xl text-center font-semibold tracking-tight">
                                {postVotes}
                            </p>
                        </div>
                    </div>
                </section>

            </article>
        </div>
    )

}