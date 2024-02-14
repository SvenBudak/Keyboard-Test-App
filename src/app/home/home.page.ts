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
import { Keyboard } from '@capacitor/keyboard';

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
      .finally(() => this.scrollDown())
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

  scrollDown() {
    this.ionContent?.scrollToBottom(0)
  }

  ionViewWillEnter() {
    this.scrollDown();
  }

  ngOnInit() {
    this.messages = [...dummyMessages];

    Keyboard.addListener('keyboardWillShow', info => {
      console.log('keyboard will show with height:', info.keyboardHeight);
    });

    Keyboard.addListener('keyboardDidShow', info => {
      console.log('keyboard will show with height:', info.keyboardHeight);
      // Adjust your UI based on keyboard height here
      Promise.resolve().then(() => {
        this.scrollDown();
      });
    });

    Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboard will hide');
    });

    Keyboard.addListener('keyboardDidHide', () => {
      console.log('keyboard did hide');
    });
  }

  ngOnDestroy() {
    // Remove event listeners to avoid memory leaks
    Keyboard.removeAllListeners().then(res => console.log(res));
  }
}
