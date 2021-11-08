import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/modalAtom'

export default function Modal() {
  const [open, setOpen] = useRecoilState(modalState)
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)

  const addImageToPost = e => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = readerEvent => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={setOpen}>
        <div className={styles.dialogContainer}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>

          <span className={styles.dialogSpacing} aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={styles.uploadContainer}>
              <div>
                {selectedFile ? (
                  <img
                    className={styles.uploadedImg}
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt="selected image from picker"
                  />
                ) : (
                  <div
                    className={styles.cameraIconContainer}
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon className={styles.cameraIcon} aria-hidden="true" />
                  </div>
                )}

                <div>
                  <div className={styles.captionContainer}>
                    <Dialog.Title as="h3" className={styles.dialogTitle}>
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
                    </div>

                    <div className={styles.captionInputContainer}>
                      <input
                        className={styles.captionInput}
                        type="text"
                        ref={captionRef}
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.uploadBtnContainer}>
                  <button type="button" className={styles.uploadBtn}>
                    Upload Post
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const styles = {
  dialog: 'fixed z-10 inset-0 overflow-y-auto',
  dialogContainer:
    'flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0',
  dialogOverlay: 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity',
  dialogSpacing: 'hidden sm:inline-block sm:align-middle sm:h-screen',
  uploadContainer:
    'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6',
  uploadedImg: 'w-full object-contain cursor-pointer',
  cameraIconContainer:
    'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer',
  cameraIcon: 'h-6 w-6 text-red-600',
  captionContainer: 'mt-3 text-center sm:mt-5',
  dialogTitle: 'text-lg leading-6 font-medium text-gray-900',
  captionInputContainer: 'mt-2',
  captionInput: 'border-none focus:ring-0 w-full text-center',
  uploadBtnContainer: 'mt-5 sm:mt-6',
  uploadBtn:
    'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300',
}
