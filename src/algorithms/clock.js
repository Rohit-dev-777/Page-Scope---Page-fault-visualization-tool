export const clock = (referenceString, frameCount) => {
  const frames = [];
  const secondChance = new Array(frameCount).fill(0);
  let pointer = 0;
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
      secondChance[frames.indexOf(page)] = 1;
    } else {
      pageFaults++;
      currentState.isFault = true;
      if (frames.length < frameCount) {
        frames.push(page);
        secondChance[frames.indexOf(page)] = 1;
      } else {
        while (secondChance[pointer] === 1) {
          secondChance[pointer] = 0;
          pointer = (pointer + 1) % frameCount;
        }
        currentState.replacedPage = frames[pointer];
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