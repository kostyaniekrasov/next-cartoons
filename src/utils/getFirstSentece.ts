import replaceStrings from './replaceStrings';

function getFirstParagraph(text: string, playlistTitle: string): string {
  const paragraphs = text.split(/\n\s*\n/);
  let firstParagraph = paragraphs[0].trim();

  const index = firstParagraph.indexOf('Підпишіться');
  if (index !== -1) {
    firstParagraph = firstParagraph.slice(0, index).trim();
  }

  firstParagraph = replaceStrings(firstParagraph, playlistTitle);

  return firstParagraph;
}

export default getFirstParagraph;
