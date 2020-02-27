public without sharing class PSContentRecordController {
    @AuraEnabled
    public static String getRecordInfo(String recordId, String contentParentField)
    {
        Map<String, Object> details = new Map<String, Object>();

        String sObjName = Id.valueOf(recordId).getSObjectType().getDescribe().getName();
        details.put('objectName', sObjName);

        if (contentParentField == null)
        {
            details.put('contentParentId', recordId);
        }
        else {
            String sqlStr = 'SELECT ' + contentParentField + ' FROM ' + sObjName + ' WHERE Id = \'' + recordId + '\'';
            List<SObject> objList = Database.query(sqlStr);
            if (objList != null && objList.size() == 1)
            {
                details.put('contentParentId', getSobjectValue(objList[0], contentParentField));
            }
            else {
                details.put('contentParentId', recordId);
            }
        }

        return JSON.serialize(details);
    }

    public static Object getSobjectValue(SObject obj, String fieldname)
    {
        Object retVal;

        if (fieldname.indexOf('.') != -1)
        {
            List<String> flds = fieldname.split('\\.');
            Integer i=1;

            for (String fld : flds)
            {
                if (obj == null) return null;

                if (i++ == flds.size())
                {
                    retVal = obj.get(fld);
                }
                else {
                    obj = (SObject)obj.getSObject(fld);
                }
            }

        }
        else {
            retVal = obj.get(fieldname);
        }

        return retVal;
    }
}