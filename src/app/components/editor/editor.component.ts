import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { faPlay, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Chip } from '../../services/yazur.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @ViewChild( 'editor' ) editorRef: ElementRef<HTMLDivElement>;
  @ViewChild( 'editorOverlay' ) editorOverlayRef: ElementRef<HTMLDivElement>;

  lineCount = 1;
  lineLabels = [1];
  currentLine = 1;
  hasFocus = false;
  editorContent = '// This is a test!\nAloha!';

  stepIcon = faStepForward;
  playIcon = faPlay;

  chip: Chip = new Chip();

  constructor() {
    this.chip.lineChange.subscribe( lineChange => {
      console.warn( lineChange );
      this.currentLine = lineChange.nextLine;
    } );
  }

  ngAfterViewInit(): void {
    this.editorContent = this.checkSyntax();
    this.editorRef.nativeElement.innerHTML = this.editorContent;
    this.checkHeight();
    this.setContent();
  }

  // TODO optimize visual input lag as chars are only rendered at keyUp
  @HostListener('document:keydown', ['$event'])
  handleKeyboardDown( keyEvent: KeyboardEvent ): void {
    if ( this.hasFocus ) {
      // Optional key behavior specification
      switch ( keyEvent.key ) {
        case 'Tab':
          keyEvent.preventDefault();
          return;
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUp( keyEvent: KeyboardEvent ): void {
    if ( this.hasFocus ) {
      // Optional key behavior specification
      switch ( keyEvent.key ) {
      }

      this.checkHeight();

      this.editorContent = this.checkSyntax();

      this.setContent();
    }
  }

  checkHeight(): void {
    this.lineCount = this.editorRef.nativeElement.offsetHeight / 24;
    const newLineLabels = [];
    for ( let i = 1; i <= this.lineCount; i++ ) {
      newLineLabels.push( i );
    }
    this.lineLabels = newLineLabels;
  }

  checkSyntax(): string {
    return this.editorRef.nativeElement.innerHTML.replace(/\/\/(.*)/g, '<span class="color-comment">//$1</span>');
  }

  setContent(): void {
    this.editorOverlayRef.nativeElement.innerHTML = this.editorContent;
  }

  setFocus( value: boolean ): void {
    this.hasFocus = value;
  }

  getWrittenCode(): string[] {
    const lines = [];
    // @ts-ignore
    for ( const line of this.editorRef.nativeElement.childNodes ) {
      lines.push( line.innerText === '\n' ? '' : line.textContent );
    }
    return lines as string[];
  }

  interpretLine(): void {
    console.log( this.getWrittenCode()[ this.currentLine - 1 ] );
    this.chip.parsed.push(
      this.chip.parse(
        this.chip.lex(
          this.getWrittenCode()[ this.currentLine - 1 ],
          this.currentLine
        )
      )
    );
    console.log(this.chip.parsed)
    this.chip.interpret();
    console.log(this.chip);
  }

  setCurrentLine( nextLine: number ): void {
    this.chip.setCurrentLine( nextLine );
  }

}
