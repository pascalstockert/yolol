import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Chip, YazurService } from '../../services/yazur.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @Input() initialContent = 'a=1\nb=2\nc=a+b\n';

  @ViewChild( 'editor' ) editorRef: ElementRef<HTMLDivElement>;
  @ViewChild( 'editorOverlay' ) editorOverlayRef: ElementRef<HTMLDivElement>;

  lineCount = 1;
  lineLabels = [1];
  currentLine = 1;
  hasFocus = false;
  editorContent = '';

  stepIcon = faStepForward;

  chip: Chip = new Chip();

  chipIntervalAction: () => void = this.startInterval;
  chipIntervalActionIcon = faPlay;
  chipIntervalSubscription;

  constructor( private yazurService: YazurService ) {
    this.chip.lineChange.subscribe( lineChange => {
      this.currentLine = lineChange.nextLine;
    } );
  }

  ngAfterViewInit(): void {
    if ( !!this.initialContent ) {
      this.setInitialContent();
    }
    this.editorContent = this.editorRef.nativeElement.innerHTML;
    this.editorRef.nativeElement.innerHTML = this.editorContent;
    this.checkHeight();
    this.setContent();
  }

  setInitialContent(): void {
    const lines = this.initialContent
      .split('\n')
      .map( line => {
        if ( line !== '' ) {
          return '<div>' + line + '</div>';
        }
        return line;
      } );
    this.editorRef.nativeElement.innerHTML = lines.join('');
    console.log(lines.join(''));
  }

  // TODO optimize visual input lag as chars are only rendered at keyUp
  @HostListener('document:keydown', ['$event'])
  handleKeyboardDown( keyEvent: KeyboardEvent ): void {
    if ( this.hasFocus ) {
      // Optional key behavior specification
      console.log(keyEvent.key)
      switch ( keyEvent.key ) {
        case 'Tab':
          keyEvent.preventDefault();
          break;
        case 'Enter':
          if ( this.lineCount === 20 ) {
            keyEvent.preventDefault();
          }
      }

      // Remove rendering of text from regular event-loop
      setTimeout( () => {
        this.checkHeight();
        this.editorContent = this.editorRef.nativeElement.innerHTML;
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
    if ( this.chip.localEnv.nextLine > this.lineCount ) {
      this.chip.setCurrentLine( 1 );
    }
    console.log(this.chip);
  }

  setCurrentLine( nextLine: number ): void {
    this.chip.setCurrentLine( nextLine );
  }

  getChipGlobals(): any {
    return Object.keys( this.chip.localEnv.global );
  }

  getChipVars(): any {
    return Object.keys( this.chip.localEnv.vars );
  }

  scrolled( event ): void {
    console.log(event.srcElement.scrollLeft);
    this.editorOverlayRef.nativeElement.scrollLeft = event.srcElement.scrollLeft;
  }

  startInterval(): void {
    this.chipIntervalAction = this.stopInterval;
    this.chipIntervalActionIcon = faPause;
    this.chipIntervalSubscription = this.yazurService.chipTimer.subscribe( () => {
      this.interpretLine();
    } );
  }

  stopInterval(): void {
    this.chipIntervalAction = this.startInterval;
    this.chipIntervalActionIcon = faPlay;
    this.chipIntervalSubscription.unsubscribe();
  }

}
