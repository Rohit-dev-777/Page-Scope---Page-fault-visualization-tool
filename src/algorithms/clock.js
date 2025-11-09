export const clock = (referenceString, frameCount) => {
  const frames = [];
  const secondChance = new Array(frameCount).fill(0);
  let pointer = 0;
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
      secondChance[frames.indexOf(page)] = 1;
    } else {
      pageFaults++;
      currentState.isFault = true;
      if (frames.length < frameCount) {
        frames.push(page);
        currentState.replacedIndex = frames.length - 1;
        secondChance[frames.indexOf(page)] = 1;
      } else {
        while (secondChance[pointer] === 1) {
          secondChance[pointer] = 0;
          pointer = (pointer + 1) % frameCount;
        }
        currentState.replacedPage = frames[pointer];
        currentState.replacedIndex = pointer;
        frames[pointer] = page;
        secondChance[pointer] = 1;
        pointer = (pointer + 1) % frameCount;
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