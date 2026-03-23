export function updateDocumentMetadata(params: {
  title: string;
  description: string;
}) {
  if (typeof document === "undefined") {
    return;
  }

  document.title = params.title;

  let descriptionTag = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]'
  );

  if (!descriptionTag) {
    descriptionTag = document.createElement("meta");
    descriptionTag.name = "description";
    document.head.appendChild(descriptionTag);
  }

  descriptionTag.content = params.description;
}
