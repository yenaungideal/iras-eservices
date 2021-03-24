export class Attachment {
  id: string;
  createdBy: string;
  dateTimeCreated: Date;
  updatedBy: string;
  dateTimeUpdated: Date;
  codeAuditReason: number;
  codeAuditSource: number;
  blobUrl: string;
  fileName: string;
  fileExtension: string;
  fileSize: number; // in KB
  codeFileProcessStatus: number;
  taxMailMessageId: string;
}

export class Document {
  supportingDocuments: Array<SupportingDocument>; // Used in Details page
  supportingDocumentsRaw: any[];
}

export class SupportingDocument {
  fileName: string;
  fileSizeText: string; // 8.71 MB
  fileSizeActual: number; // 9,135,668 bytes
}

export class SupportingDocumentError {
  fileName: string;
  fileFormatErrorMsg: string;
}
