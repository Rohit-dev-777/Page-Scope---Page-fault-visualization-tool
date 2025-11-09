export const lru = (referenceString, frameCount) => {
  const frames = [];
  const recent = [];
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
      recent.splice(recent.indexOf(page), 1);
      recent.push(page);
    } else {
      pageFaults++;
      currentState.isFault = true;
      if (frames.length < frameCount) {
        frames.push(page);
        currentState.replacedIndex = frames.length - 1;
        recent.push(page);
      } else {
        const lruPage = recent.shift();
        const replacedIndex = frames.indexOf(lruPage);
        currentState.replacedPage = frames[replacedIndex];
        currentState.replacedIndex = replacedIndex;
        frames[replacedIndex] = page;
        recent.push(page);
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