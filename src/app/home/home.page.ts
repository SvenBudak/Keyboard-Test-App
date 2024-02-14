import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  ViewWillEnter,
  IonButtons,
  IonBackButton, IonFooter, IonIcon
} from '@ionic/angular/standalone';
import {DomSanitizer} from "@angular/platform-browser";
import {dummyMessages} from "../app.const";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, CommonModule, FormsModule, IonButtons, IonBackButton, IonContent, IonFooter, IonIcon],
})
export class HomePage implements OnInit, ViewWillEnter {
  @ViewChild(IonContent) ionContent?: IonContent;
  @ViewChild('messageInput') messageInput: ElementRef<HTMLTextAreaElement> | undefined = undefined;
  message = '';
  messages: string[] = [];
  showPicker = false;
  scrollTop = 0;

  constructor(private sanitizer: DomSanitizer) {
    console.log(1);
  }

  async sendMessage() {
    if (this.message.trim()) {
      this.messages.push(this.message);
      this.message = '';
    }
    this.setFocus();
  }

  async onSendClicked() {
    this.sendMessage()
      .finally(() => this.ionContent?.scrollToBottom(0))
  }

  setFocus() {
    this.messageInput?.nativeElement.focus();
  }

  togglePicker() {
    this.showPicker = !this.showPicker;
    this.setFocus();
  }

  keyDownEnter(event: any) {
    event.preventDefault();
    if (!event.shiftKey) {
      this.sendMessage();
    }
  }

  ngOnInit() {
    // Laden der Dummy-Nachrichten beim Initialisieren
    this.messages = [...dummyMessages];
  }

  ionViewWillEnter() {
    this.ionContent?.scrollToBottom(0);
  }
}
