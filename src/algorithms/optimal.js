export const optimal = (referenceString, frameCount) => {
  const frames = [];
  let pageFaults = 0;
  const sequence = [];

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
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
        const future = referenceString.slice(i + 1);
        let farthest = -1;
        let pageToReplace = -1;

        for (const framePage of frames) {
          const nextUse = future.indexOf(framePage);
          if (nextUse === -1) {
            pageToReplace = framePage;
            break;
          }
          if (nextUse > farthest) {
            farthest = nextUse;
            pageToReplace = framePage;
          }
        }
        const replacedIndex = frames.indexOf(pageToReplace);
        currentState.replacedPage = frames[replacedIndex];
        currentState.replacedIndex = replacedIndex;
        frames[replacedIndex] = page;
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