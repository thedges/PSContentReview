public without sharing class PSContentViewerController {
    @AuraEnabled
    public static String getRecordContent(String recordId)
    {
        List<Map<String, Object>> contList = new List<Map<String, Object>>();

        for (ContentDocumentLink cdl : [SELECT ContentDocumentId, ContentDocument.Title, ContentDocument.PublishStatus,
                                           ContentDocument.FileType, ContentDocument.FileExtension, ContentDocument.ContentSize,
                                           ContentDocument.LatestPublishedVersionId, ContentDocument.LastModifiedDate
                                           FROM ContentDocumentLink
                                           WHERE LinkedEntityId = :recordId and IsDeleted=false
                                           ORDER BY  ContentDocument.LastModifiedDate DESC])
        {
            Map<String, Object> docInfo = new Map<String, Object>();
            docInfo.put('id', cdl.ContentDocumentId);
            docInfo.put('title', cdl.ContentDocument.Title);
            docInfo.put('publishStatus', cdl.ContentDocument.PublishStatus);
            docInfo.put('fileType', cdl.ContentDocument.FileType);
            docInfo.put('fileExtension', cdl.ContentDocument.FileExtension);
            docInfo.put('size', cdl.ContentDocument.ContentSize);
            docInfo.put('versionId', cdl.ContentDocument.LatestPublishedVersionId);
            docInfo.put('lastModDate', cdl.ContentDocument.LastModifiedDate.format());

            contList.add(docInfo);
        }

        return JSON.serialize(contList);

    }
}