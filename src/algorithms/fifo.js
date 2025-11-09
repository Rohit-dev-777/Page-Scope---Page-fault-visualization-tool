export const fifo = (referenceString, frameCount) => {
  const frames = [];
  let pageFaults = 0;
  const sequence = [];

  for (const page of referenceString) {
    const framesBefore = [...frames];
    const currentState = {
      page: page,
      frames: [...frames],
      framesBefore: framesBefore,
      isHit: false,
      isFault: false,
      replacedPage: null,
      replacedIndex: null,
    };

    if (frames.includes(page)) {
      currentState.isHit = true;
    } else {
      pageFaults++;
      currentState.isFault = true;
      if (frames.length < frameCount) {
        frames.push(page);
        currentState.replacedIndex = frames.length - 1;
      } else {
        const replaced = frames.shift();
        currentState.replacedPage = replaced;
        frames.push(page);
        currentState.replacedIndex = frames.length - 1; // New page goes to the end after push
      }
    }
    currentState.frames = [...frames];
    sequence.push(currentState);
  }

  return {
    pageFaults,
    sequence,
  };
};