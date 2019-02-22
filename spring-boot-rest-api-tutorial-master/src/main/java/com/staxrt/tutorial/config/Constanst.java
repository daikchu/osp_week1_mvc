package com.staxrt.tutorial.config;

public final class Constanst {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "en";

    public static final String HISTORY_TYPE_MAINTENANCE = "Maintenance";
    public static final String HISTORY_TYPE_INCIDENT = "Incident";
    public static final String HISTORY_TYPE_HISTORY = "History";

    public static final String EXCEL_EQUIPMENT_PROFILE_NAME = "Equipment Profile";
    public static final String EXCEL_MODF_EOR_NAME = "MODF or EoR ODF";
    public static final String EXCEL_POWER_PROFILE_NAME = "Power Profile";

    public static final String EQUIPMENT_PROFILE_TYPE = "EQUIPMENT";
    public static final String MODF_EOR_TYPE = "MODF_EOR";
    public static final String POWER_PROFILE_TYPE = "POWER";

    public static final String[] EXCEL_HEADER_MT_CONN_INFO_MIDDLE_2 = {"Network type", "MODF/EoR name", "MODF/EoR type", "Rack/Subrack/Slot/", "Port"};

    public static final String EXCEL_HEADER_MT_CONN_INFO_MIDDLE_1 = "MODF or EoR node ";

    public static final String EXCEL_HANDOVER_DOCS = "Handover-docs.xlsx";
    public static final String EXCEL_MATERIAL_SPART = "Material-spart.xlsx";

    public static final String EXCEL_COVER_MANAGER = "Manager: ";

    public static final String EXCEL_COVER_PHONE_NUMBER = "Phone number: ";

    public static final String EXCEL_COVER_EMAIL = "Email: ";

    public static final String FORMAT_DATE_TYPE_1 = "dd/MM/yyyy";

    public static final String FORMAT_DATE_TYPE_2 = "MMMM, yyyy";

    public static final String FORMAT_TIME_TYPE_1 = "HH:mm dd/MM/yyyy";

    public static final String EXCEL_POWER_CONN_INTERNAL_LABEL = "Internal power connection";

    public static final String EXCEL_POWER_CONN_EXTERNAL_LABEL = "External power connection";

    public static final String UTF_8 = "UTF-8";

    public static final CharSequence HTTP_TEXT = "http";

    public static final String PDF = ".pdf";

    public static final String EXCEL_HEADER_MT_CONN_INFO_REMOTE_1 = "Remote Node";

    public static final String[] EXCEL_HEADER_MT_CONN_INFO_REMOTE_2 = {"Network type", "Equipment name", "Equipment type",
            "Rack/Subrack/Slot/", "Port"};

    public static final String EXCEL_HEADER_MT_CONN_INFO_REMOTE_CAPACITY = "Link capacity \r\n" +
            "(100M/1G/10G/100G/STM1/STM4/STM16/STM64/other)";

    public static final String EXCEL_HEADER_MT_CONN_INFO_REMOTE_CONN_TYPE = "Connection type\r\n" +
            "(Electrical/Optical)";

    public static final String EXCEL_HEADER_MT_CONN_INFO_REMOTE_NOTE = "Note";

    public static final String EXCEL_MATERIAL_SPART_WORK = "Work";

    public static final String EXCEL_MATERIAL_SPART_NOT_WORK = "Not Work";

    public static final String IMAGE_JPG = ".jpg";

    public static final String IMAGE_PNG = ".png";

    public static final String EXCEL = ".xlsx";

    public static final String POWER_FORMAT_CB = "/F";

    public interface Roles {
        Long ROLE_SUPER_ADMIN = 1L;
        Long ROLE_ADMIN = 2L;
        Long ROLE_USER = 3L;
    }

    public interface FolderLocation {
        Integer LOCATION_TEMP = 0;
        Integer LOCATION_ROOT = 1;

        Integer LOCATION_CABINET = 2;
        Integer LOCATION_PHYS_ACES = 3;
        Integer LOCATION_DOCS = 4;
        Integer LOCATION_HANDOVER_DOCS = 5;
        Integer LOCATION_LAYOUTS = 7;
        Integer LOCATION_ROUTINE = 8;
        Integer LOCATION_PERSONAL = 9;

        Integer LOCATION_OTHER = 6;
    }

    public interface FolderName {
        String FOLDER_TEMP = "temp";
        String FOLDER_ROOT = "upload";

        String FOLDER_CABINET = "cabinet";
        String FOLDER_PHYS_ACES = "physicalSiteAccess";
        String FOLDER_DOCS = "document";
        String FOLDER_HANDOVER_DOCS = "handoverDocs";
        String FOLDER_LAYOUTS = "layout";
        String FOLDER_ROUTINE = "routine";
        String FOLDER_PERSONAL = "personal";

        String FOLDER_OTHER = "other";
    }

    public interface ChartsName {
        String USED_FOOTPRINT = "Used";
        String NOT_USED_FOOTPRINT = "Not Used";

        String POWER_CONSUMPTION_TOTAL = "Total by months";
        String POWER_CONSUMPTION_MTSO = "MTSO by months";
        String OFFICE_CC_CANTEEN_DORMITORY = "Office + CC + Canteen + Dormitory + other";
        String TOTAL_POWER_CUT_TIME = "Total Time(H)";
        String NUMBER_POWER_CUT_TIME = "Number of power cut time";

        String OTHER = "Other";
    }

    public interface ProfileType {
        String EQUIPMENT = "EQUIPMENT";
        String MODF = "MODF_EOR";
        String POWER = "POWER";
    }

    public interface MtRanking {
        Integer DEFAULT_POINT = 100;
    }

}