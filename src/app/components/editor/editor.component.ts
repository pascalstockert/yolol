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
  editorContent = '';

  stepIcon = faStepForward;
  playIcon = faPlay;

  chip: Chip = new Chip();

  constructor() {
    this.chip.lineChange.subscribe( lineChange => {
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

      // Remove rendering of text from regular event-loop
      setTimeout( () => {
        this.checkHeight();
        this.editorContent = this.checkSyntax();
        this.setContent();
      } );
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
    const lines = [];
    this.getWrittenCode().forEach(  ( line, i ) => {
      lines.push( this.chip.parse( this.chip.lex( line, i ) ) );
    } );
    this.chip.setParsed( lines );
    this.chip.interpret();
    console.log(this.chip);
  }

  setCurrentLine( nextLine: number ): void {
    this.chip.setCurrentLine( nextLine );
  }

  getChipVars(): any {
    return Object.keys( this.chip.localEnv.vars );
  }

  scrolled( event ): void {
    console.log(event.srcElement.scrollLeft);
    this.editorOverlayRef.nativeElement.scrollLeft = event.srcElement.scrollLeft;
  }

}
