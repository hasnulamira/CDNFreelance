import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //UI View Variables
  ViewUserID:any = "";
  ViewUsername: any = "";
  ViewSkillS :any[] = [];
  ViewDeleteSkillS :any[] = [];
  ViewHobbies :any[] = [];
  ViewDeleteHobbies :any[] = [];
  
  //UI Input Update Variables
  InputUsername:any = "";
  InputEmail:any = "";
  InputPhoneNo:any = "";
  InputSkill:any = "";
  InputHobby:any = "";

  //Pagination Varibles
  TempPageNum:any = 0;
  TempPageSize:any = 5;
  LoaderStatus : boolean = false;

  //Datatable Variables
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['username','email', 'phoneno','action'];
  RecordCount: any = 0;
  data = {};
  constructor(private apiServices: ApiserviceService) { }
  ngOnInit(): void {
    this.GetData(this.TempPageNum,this.TempPageSize);
  }

  async GetData(PageNum:any, PageSize:any){
    this.LoaderStatus = true;
    const result = await this.apiServices.GetAllUser(PageNum,PageSize);
    // result.user.forEach((currentValue: any, index: any) => {
      
    // });
    this.LoaderStatus = false;
    this.dataSource = new MatTableDataSource(result.user);
    this.RecordCount = result.totalRecord;
  }
  async GetDetail(UserID:any){
    this.LoaderStatus = true;
    const result = await this.apiServices.GetUser(UserID);
    this.ViewUserID = result.userID;
    this.ViewUsername = result.username;
    this.InputEmail = result.email;
    this.InputPhoneNo = result.phoneNum;
    this.ViewSkillS = result.skill;
    this.ViewHobbies = result.hobby;
    this.LoaderStatus = false;
  }
  async UpdateUser(UserID:any){
    this.LoaderStatus = true;
    let Params = {
      "email": this.InputEmail,
      "phoneNum": this.InputPhoneNo,
      "skill" : this.ViewSkillS,
      "skillToRemove" : this.ViewDeleteSkillS,
      "hobby": this.ViewHobbies,
      "hobbyToRemove": this.ViewDeleteHobbies
    };
    const result = await this.apiServices.UpdateUser(UserID,Params);
    if(result.hasError){
      alert(result.errMsg);
      this.GetData(this.TempPageNum,this.TempPageSize);
      this.LoaderStatus = false;
    }else{
      alert(result.errMsg);
      this.GetData(this.TempPageNum,this.TempPageSize);
      this.LoaderStatus = false;
    }
  }
  async DeleteUser(UserID:any){
    this.LoaderStatus = true;
    const result = await this.apiServices.DeleteUser(UserID);
    if(result.hasError){
      alert(result.errMsg);
      this.GetData(this.TempPageNum,this.TempPageSize);
      this.LoaderStatus = false;
    }else{
      alert(result.errMsg);
      this.GetData(this.TempPageNum,this.TempPageSize);
      this.LoaderStatus = false;
    }
  }
  async RegisterUser(Username:any,Email:any, PhoneNo:any){
    this.LoaderStatus = true;
    if(Username === "" || Email === "" || PhoneNo === ""){
      alert("Please key in the detaiil");
      this.LoaderStatus = false;
    }else{
      let Params = {
        "username": Username,
        "email": Email,
        "phoneNum": PhoneNo,
        "skill" : this.ViewSkillS,
        "hobby" : this.ViewHobbies,
      };
      const result = await this.apiServices.RegisterUser(Params);
      if(result.hasError){
        alert(result.errMsg);
        this.GetData(this.TempPageNum,this.TempPageSize);
        this.LoaderStatus = false;
      }else{
        alert(result.errMsg);
        this.ResetValue();
        this.GetData(this.TempPageNum,this.TempPageSize);
        this.LoaderStatus = false;
      }
    }
    
  }
  paginatorEvent(e: PageEvent) {
    this.TempPageNum = e.pageIndex;
    this.TempPageSize = e.pageSize;
    this.GetData(e.pageIndex,e.pageSize);
    this.LoaderStatus = true;
  }
  ResetValue(){
    this.InputUsername = "";
    this.InputEmail = "";
    this.InputPhoneNo = "";
    this.InputSkill = "";
    this.InputHobby = "";
    this.ViewSkillS = [];
    this.ViewHobbies = [];
  }
  AddSkill(SkillName:any){
    if(SkillName === ""){
      alert("Please key in skill name");
    }else{
      this.ViewSkillS.push(
        {
          "skillID":null,
          "skillName":SkillName
        });
        this.InputSkill = "";
    }
  }
  DeleteSkill(SkillID:any){
    this.ViewSkillS.forEach((currentValue: any, index: any) => {
      if(currentValue.skillID === SkillID){
        this.ViewDeleteSkillS.push({"skillID":SkillID});
        this.ViewSkillS.splice(index, 1);
      }
    });
  }
  AddHobby(HobbyName:any){
    if(HobbyName === ""){
      alert("Please key in hobby");
    }else{
      this.ViewHobbies.push(
        {
          "hobbyID":null,
          "hobbyName":HobbyName
        });
        this.InputHobby = "";
    }
  }
  DeleteHobby(HobbyID:any){
    this.ViewHobbies.forEach((currentValue: any, index: any) => {
      if(currentValue.hobbyID === HobbyID){
        this.ViewDeleteHobbies.push({"hobbyID":HobbyID});
        this.ViewHobbies.splice(index, 1);
      }
      
    });
  }
}
