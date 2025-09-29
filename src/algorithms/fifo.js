export const fifo = (referenceString, frameCount) => {
  const frames = [];
  let pageFaults = 0;
  const sequence = [];

  for (const page of referenceString) {
    const currentState = {
      page: page,
      frames: [...frames],
      isHit: false,
      isFault: false,
      replacedPage: null,
    };

    if (frames.includes(page)) {
      currentState.isHit = true;
    } else {
      pageFaults++;
      currentState.isFault = true;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        const replaced = frames.shift();
        currentState.replacedPage = replaced;
        frames.push(page);
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