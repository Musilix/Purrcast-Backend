export default function faq() {
  return (
    <div id="faq-wrap" className="*:my-[45px]">
      <section id="intro" className="w-full *:m-0">
        <h1 className="scroll-m-20 pb-4 text-4xl font-extrabold tracking-tight lg:text-5xl break-words">
          What is this?
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words drop-shadow-custom">
          Purrcast in the most simple terms is an app that uses cat pics
          uploaded by people in your city to predict the weather. The more cats
          laying on their heads, the higher the chance of rain in the coming
          days.
        </p>

        <div
          id="splash-buttons"
          className="flex flex-row justify-start w-full mt-8 space-x-4"
        ></div>
      </section>

      <section id="still-confused" className="w-full *:m-0 border-s-2 pl-4">
        <h1 className="scroll-m-20 pb-0 text-3xl font-bold tracking-tight break-word text-primary-glow drop-shadow-custom">
          Wait.. What?
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          To get a better idea of our goal, think about the following example:
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          Fire up those neurons and imagine 3 of your friends (or just randos)
          in your city have posted images of their cats - preferably sleeping -
          over the past 2 days.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          Of those 3 sleepings cats, 2 of them are laying on their heads. This
          means that there is a 66% - or <sup>2</sup>&frasl;<sub>3</sub>, for
          you math gurus - chance of rain in your area in the coming days. What
          are the <i>coming days</i>? You figure it out!
        </p>

        <div
          id="splash-buttons"
          className="flex flex-row justify-start w-full mt-8 space-x-4"
        ></div>
      </section>

      <section id="what-do-i-post" className="w-full">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          What do I post here?
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          Pictures of your cat! As many as you want, whenever you want.
        </p>
      </section>

      <section id="what-kind-of-cat-pics" className="w-full">
        <div id="pic-details-wrap" className="w-full">
          <div id="pic-details" className="w-full">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              What kind of cat pictures?
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
              Although all cat pics are good cat pics, on Purrcast that is a
              different story. We're looking for a specific type of cat pic.
              That is, pictures of <b>sleeping cats only</b>! If you decide to
              post a photo on Purrcast to help others devolve back to their
              monolithic roots, you must make sure your cat is asleep in the
              photo. Otherwise, it will taint the data!
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
              We do have systems in place to stop people from posting non-cat
              photos, but we are actually legally obligated to tell you that the
              creator of this site has an IQ less than 96, so we can't put too
              much trust into that. Although the systems are there, please do
              your due diligence and make sure your cat is asleep in the photo
              before posting.
              {/* Please report any photos that are not of sleeping
              cats. */}
            </p>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
              What do we consider <i>sleeping on it's head</i>?
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
              As already mentioned, the means for us predicting the weather is
              solely based on whether a cat is sleeping on it's head or not. You
              may confused as to what we consider a cat sleeping on it's head,
              so please refer to the examples below for the 2 types of sleeping
              cats we consider:
            </p>
          </div>
          <div
            id="pic-details-example-images"
            className="w-full flex flex-col justify-center place-items-center mt-10 *:m-5 md:flex-row md:justify-between items-center md:items-start"
          >
            <div className="w-[250px] sm:w-3/4 md:w-1/2">
              <div
                id="bad-examples"
                className="aspect-square relative grid grid-cols-3 grid-rows-3 gap-5 mt-5 p-5 bg-accent rounded-lg border-dashed border border-accent-foreground"
              >
                <img
                  src="/sleeping_cats/notonhead/1.png"
                  alt="bad example 1"
                  className="w-full h-full row-span-2 col-span-1 rounded-md"
                />
                <img
                  src="/sleeping_cats/notonhead/2.png"
                  alt="bad example 2"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />
                <img
                  src="/sleeping_cats/notonhead/3.png"
                  alt="bad example 3"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />
                <img
                  src="/sleeping_cats/notonhead/4.png"
                  alt="bad example 4"
                  className="w-full h-full row-span-2 col-span-2 rounded-md"
                />
                <img
                  src="/sleeping_cats/notonhead/5.png"
                  alt="bad example 5"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />

                <div className="min-w-[70px] max-w-[250px] w-1/6 absolute -left-[20px] -top-[30px] bg-background border-foreground border-dashed border p-4 rounded-full">
                  <img
                    src="/incorrect.png"
                    alt="incorrect-indicator-image"
                    className="drop-shadow-red"
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
                  Notice how these cats are either loafing, lounging, or
                  noodling. Although these are all valid cat poses, they are not
                  what we consider a cat sleeping on it's head at Purrcast.
                </p>
              </div>
            </div>

            <div className="w-[250px] sm:w-3/4 md:w-1/2">
              <div
                id="good-examples"
                className="aspect-square relative grid grid-cols-3 grid-rows-3 gap-5 mt-5 p-5 bg-accent rounded-lg border-dashed border border-accent-foreground"
              >
                <img
                  src="/sleeping_cats/onhead/1.png"
                  alt="good example 4"
                  className="w-full h-full row-span-2 col-span-2 rounded-md"
                />
                <img
                  src="/sleeping_cats/onhead/2.png"
                  alt="good example 1"
                  className="w-full h-full row-span-2 col-span-1 rounded-md"
                />
                <img
                  src="/sleeping_cats/onhead/3.png"
                  alt="good example 2"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />
                <img
                  src="/sleeping_cats/onhead/4.png"
                  alt="good example 3"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />
                <img
                  src="/sleeping_cats/onhead/5.png"
                  alt="good example 5"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />

                <div className="min-w-[70px] max-w-[250px] w-1/6 absolute -left-[20px] -top-[30px] bg-background border-foreground border-dashed border p-4 rounded-full">
                  <img
                    src="/correct.png"
                    alt="correct-indicator-image"
                    className=" drop-shadow-green"
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
                  In contrast, these cats are flipped completely upside down.
                  Although there are variations to a cat sleeping on it's head,
                  the decisive factor is that it's belly is in the air.
                </p>
              </div>
            </div>
          </div>
          {/* 
            <div
              id="misc-pic-details"
              className="w-full flex flex-col justify-center mt-10 *:m-5 md:flex-row md:justify-between sm:place-items-center md:place-items-start"
            >
              <div
                id="good-examples"
                className="sm:size-3/4  md:size-1/2 aspect-square relative grid grid-cols-3 grid-rows-3 gap-5 mt-5 p-5 bg-accent rounded-lg border-dashed border border-accent-foreground"
              >
                <img
                  src="https://cdn2.thecatapi.com/images/-y_6SBPrw.jpg"
                  alt="good example 4"
                  className="w-full h-full row-span-2 col-span-2 rounded-md"
                />
                <img
                  src="https://cdn2.thecatapi.com/images/MTkyNzQ3NA.gif"
                  alt="good example 1"
                  className="w-full h-full row-span-2 col-span-1 rounded-md"
                />
                <img
                  src="https://cdn2.thecatapi.com/images/bfb.jpg"
                  alt="good example 2"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />
                <img
                  src="https://cdn2.thecatapi.com/images/9hn.jpg"
                  alt="good example 3"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />
                <img
                  src="https://cdn2.thecatapi.com/images/A7Dsj7g1x.png"
                  alt="good example 5"
                  className="w-full h-full row-span-1 col-span-1 rounded-md"
                />

                <div className="size-1/6 absolute -left-[20px] -top-[30px] bg-background border-foreground border-dashed border p-4 rounded-full">
                  <img
                    src="/correct.png"
                    alt="correct-indicator-image"
                    className=" drop-shadow-green"
                  />
                </div>
              </div>

              <div className=" sm:w-full mt-5">
                <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas tempor ex quis ipsum sollicitudin, eu fermentum ante
                  maximus.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
                  Integer consequat sapien et lobortis elementum. Nam id sapien
                  tempus velit iaculis cursus. Nunc interdum ligula sed neque
                  aliquet ultrices. Praesent metus elit, semper quis iaculis
                  quis, scelerisque tincidunt tortor. Nullam tincidunt finibus
                  lacus, ac tristique dolor volutpat a. Aenean ut rutrum purus.
                  Pellentesque semper hendrerit ipsum, at tempus sem pharetra
                  at. Ut magna erat, ullamcorper in volutpat quis, cursus quis
                  lectus. Morbi viverra pellentesque leo, nec blandit tortor
                  mollis eget.
                </p>
              </div>
            </div> */}
        </div>
      </section>

      <section id="how-do-we-make-predictions" className="w-full">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          How do we make our predictions?
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          The way we make our predictions is absolutely nothing special.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          The way we show a specific user a prediction first starts with
          grabbing their location. If they're gracious enough to allow us to use
          their location, we will then make a request to our backend to search
          for all posts within a certain radius of the user's location.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          We store each cat post with a special piece of metadata that gets
          generated usually a few seconds after the submission of the post. This
          column is a{' '}
          <span className="text-green-500">
            <b>true</b>
          </span>{' '}
          or{' '}
          <span className="text-red-500">
            <b>false</b>
          </span>{' '}
          value that indicates whether the cat in the photo is laying on their
          head or not. This logic is handled by... 🥁 you guessed it! ARTIFICIAL
          INTELLIGENCE. Let's not dive deeper into that.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words">
          We utilize this special piece of metadata while combing through all
          the posts from within the user's radius, keeping track of how many
          have a{' '}
          <span className="text-green-500">
            <b>true</b>
          </span>{' '}
          value and how many have a{' '}
          <span className="text-red-500">
            <b>false</b>
          </span>{' '}
          value. We finally divide that sum of posts where the cat is laying on
          it's head by the total number of posts within the user's radius to get
          a percentage.
        </p>

        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6"></h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6 break-words"></p>
      </section>

      <footer>
        <p className="text-primary-glow">
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by{' '}
          <a
            href="https://www.instagram.com/keem.korn/"
            className="bg-indigo-700 rounded-md p-y-1 px-1 hover:bg-indigo-300 hover:text-black transition-all"
          >
            @keem.korn
          </a>
        </p>
      </footer>
    </div>
  );
}
