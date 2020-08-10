import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent{


  @ViewChild('fileInputID',{ static: false }) fileInput :ElementRef;
  isFileInputClicked :boolean= true;
  isHovering: boolean;
  errorAmount:boolean = false;
  errorType:boolean=false;
  fileReady : boolean = false;
  @Output() urlLink = new EventEmitter<string>();

  files: File[] = [];



  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    let typeFile= files[0].type+"";
    typeFile = typeFile.substring(0,5);
    this.urlLink .emit("");
    this.errorType = false;
    console.log("type is======>"+typeFile);
    if(typeFile !== 'image'){
      this.errorType = true;
      /* this.deleteInputFile(); */
      return;
    }
    if(files.length > 1){
      this.errorAmount = true;
      return;
    }
    if(this.files.length > 0){
      this.errorAmount = true;
      return;
    }
    this.errorAmount = false;
    /* this.fileName = files[0].name+""; */
    this.files.push(files.item(0));

    /* for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    } */
  }

  openExplorer($event){
    console.log(this.isFileInputClicked);
    this.fileInput.nativeElement.click();

  }

  deleteInputFile(){
    this.errorAmount = false;
    this.files.splice(0,1);
    this.urlLink .emit("");
    this.fileReady=false;
    this.fileInput.nativeElement.value = null;//
  }

  DownloadLinkReady(url:string){
    this.urlLink.emit(url);
    this.fileReady=true;
  }
}
