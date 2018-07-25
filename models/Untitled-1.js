var story = {
    likes: [],
    title: "The Brady Bunch",
    description: "Kids! We're going to SEARS!",
    body: "This is the story...",
    comments: [
        { _id: 123, likes: [{}, {}] },
        { _id: 789, likes: [{}] },
    ],
    acceptedComments: [
        { _id: 456, likes: [{}, {}, {}] }
    ]
}

// {/* <div>
//     {story.body} {story.acceptedComments.map((c) => {
//         return c.body
//     })}
// </div> */}