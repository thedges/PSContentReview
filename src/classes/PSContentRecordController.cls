public without sharing class PSContentRecordController {
    @AuraEnabled
    public static String getRecordInfo(String recordId, String contentParentField)
    {
        Map<String, Object> details = new Map<String, Object>();
        Id recId = Id.valueOf(recordId);

        String sObjName = recId.getSObjectType().getDescribe().getName();
        details.put('objectName', sObjName);

        Boolean recTypeExists = false;
        if (recId.getSObjectType().getDescribe().getRecordTypeInfosByName().size() > 1)
        {
            recTypeExists = true;
        }

        if (contentParentField == null)
        {
            details.put('contentParentId', recordId);
            if (recTypeExists)
            {
                String sqlStr = 'SELECT recordtypeid FROM ' + sObjName + ' WHERE Id = \'' + recordId + '\'';
                List<SObject> objList = Database.query(sqlStr);
                if (objList != null && objList.size() == 1)
                {
                    details.put('recordTypeId', objList[0].get('recordtypeid'));
                }
            }
        }
        else {
            String sqlStr;
            if (recTypeExists)
            {
                sqlStr = 'SELECT recordtypeid, ' + contentParentField + ' FROM ' + sObjName + ' WHERE Id = \'' + recordId + '\'';
            }
            else {
                sqlStr = 'SELECT ' + contentParentField + ' FROM ' + sObjName + ' WHERE Id = \'' + recordId + '\'';
            }

            
            List<SObject> objList = Database.query(sqlStr);
            if (objList != null && objList.size() == 1)
            {
                details.put('contentParentId', getSobjectValue(objList[0], contentParentField));
                if (recTypeExists) details.put('recordTypeId', objList[0].get('recordtypeid'));
            }
            else {
                details.put('contentParentId', recordId);
            }
        }

        return JSON.serialize(details);
    }

    /*
    public static Boolean fieldExists(ID recordId, String fieldName)
    {
        if (recordId == null || fieldName == null) return false;

        String sObjName = Id.valueOf(recordId).getSObjectType().getDescribe().getName();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(sObjName).getDescribe().fields.getMap();
        return fieldMap.containsKey(fieldName);
    }
    */

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