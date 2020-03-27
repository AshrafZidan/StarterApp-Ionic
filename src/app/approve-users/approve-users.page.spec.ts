import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApproveUsersPage } from './approve-users.page';

describe('ApproveUsersPage', () => {
  let component: ApproveUsersPage;
  let fixture: ComponentFixture<ApproveUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
