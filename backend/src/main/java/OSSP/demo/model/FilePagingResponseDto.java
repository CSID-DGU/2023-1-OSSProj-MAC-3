package OSSP.demo.model;

import OSSP.demo.entity.File;
import OSSP.demo.entity.FileVersion;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FilePagingResponseDto {

    private final Long fileId;
    private final Long fileVersionId;
    private final String memberName;
    private final String fileName;
    private final String s3url;
    private final String commitMessage;


    public static FilePagingResponseDto from(File file) {
        return FilePagingResponseDto.builder()
                .fileId(file.getFileId())
                .memberName(file.getMember().getUser().getName())
                .fileName(file.getRealFileName())
                .s3url(file.getS3FileUrl())
                .commitMessage(file.getCommitMessage())
                .build();
    }

    public static FilePagingResponseDto from(FileVersion fileVersion) {
        return FilePagingResponseDto.builder()
                .fileVersionId(fileVersion.getFileVersionId())
                .memberName(fileVersion.getMember().getUser().getName())
                .s3url(fileVersion.getS3FileVersionUrl())
                .commitMessage(fileVersion.getCommitMessage())
                .build();
    }
}
