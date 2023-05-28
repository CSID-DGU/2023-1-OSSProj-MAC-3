package OSSP.demo.model;

import OSSP.demo.entity.File;
import OSSP.demo.entity.FileVersion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FilePagingResponseDto {

    private  Long fileId;
    private  Long fileVersionId;
    private  String memberName;
    private  String fileName;
    private  String s3url;
    private  String commitMessage;
    private  String updateDate;


    public FilePagingResponseDto(File file){
        fileId = file.getFileId();
        fileName = file.getRealFileName();
        updateDate = file.getUpdateDate();
        memberName = file.getMember().getUser().getName();
        s3url = file.getS3FileUrl();
        commitMessage = file.getCommitMessage();
    }

    public FilePagingResponseDto(FileVersion fileVersion){
        fileVersionId = fileVersion.getFileVersionId();
        updateDate = fileVersion.getUpdateDate();
        memberName = fileVersion.getMember().getUser().getName();
        s3url = fileVersion.getS3FileVersionUrl();
        commitMessage = fileVersion.getCommitMessage();
        fileName = fileVersion.getFile().getRealFileName();
    }


}
